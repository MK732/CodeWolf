"use client";
import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "../custom-prism.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { marked } from "marked";
import { useUser } from "@clerk/nextjs"; // Clerk import for user info

const CodeReview = () => {
  const { user } = useUser(); // Access Clerk user object
  const userId = user?.id || "guest"; // Fallback to 'guest' if user is not authenticated

  const [reviewResult, setReviewResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [memory, setMemory] = useState<any[]>([]); // To store memory titles and reviews

  const contentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load user-specific memory from localStorage on component mount
  useEffect(() => {
    const storedMemories = localStorage.getItem(`codeReviewMemory_${userId}`);
    if (storedMemories) {
      setMemory(JSON.parse(storedMemories));
    }
  }, [userId]); // Reload whenever the user changes

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [reviewResult, message]);

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  };

  const handleSubmitReview = async () => {
    setIsLoading(true);
    setReviewResult("");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (typeof data.result === "string") {
        // Wrap user message in <pre><code> tags for syntax highlighting
        const userMessageCode = `<pre><code class="language-javascript">${message
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`;

        setReviewResult(data.result);

        // Save the new review to memory
        const newMemory = {
          title: `Code Review ${memory.length + 1}`,
          userMessage: userMessageCode, // Save the user's code with <pre><code> tags
          aiResponse: data.result, // Save the AI's response
        };

        let updatedMemory = [...memory];

        // Check if memory length is 5, remove the oldest memory if so
        if (updatedMemory.length === 5) {
          updatedMemory.shift(); // Remove the oldest memory (first item)
        }

        updatedMemory = [...updatedMemory, newMemory]; // Add the new memory

        setMemory(updatedMemory);

        // Store the updated memory in localStorage for the current user
        localStorage.setItem(
          `codeReviewMemory_${userId}`,
          JSON.stringify(updatedMemory)
        );
      } else {
        setReviewResult("Invalid response format.");
      }
    } catch (error) {
      setReviewResult("RATE LIMITED: Please try again later.");
    } finally {
      setIsLoading(false);
      setMessage(""); // Clear the textarea here
    }
  };
  const handleMemoryClick = (index: number) => {
    const selectedMemory = memory[index];
    if (selectedMemory) {
      setReviewResult(
        `<div class="user-message-container"><strong>USER TEXT</strong><br/>${selectedMemory.userMessage}</div><br/><strong>AI REVIEW</strong><br/><br/>${selectedMemory.aiResponse}`
      ); // Load both user message and AI review with labels
    }
  };

  const renderContent = (text: any): JSX.Element => {
    const htmlContent: any = marked.parse(text);

    return (
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar with saved memories */}
      <div className="fixed bg-onyx text-white h-screen md:py-[68px] hidden md:block top-0 w-[340px] md:w-[300px] flex-none p-4 overflow-y-auto">
        <h1 className="text-2xl xl:text-4xl hover:text-frost bg-onyx mb-4">
          Code Wolf - AI Review
        </h1>
        <div>
          <h2 className="hidden md:block text-xl xl:text-2xl my-4">Memory</h2>
          {memory.length > 0 ? (
            memory.map((mem, index) => (
              <p
                key={index}
                className="text-md xl:text-lg py-2 cursor-pointer hover:text-frost"
                onClick={() => handleMemoryClick(index)}
              >
                {mem.title}
              </p>
            ))
          ) : (
            <p>No memories yet.</p>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 my-10 md:my-0 h-[40rem] 1440p:h-[73.6rem] 1080p:h-[51rem] flex flex-col items-center overflow-y-auto xl:p-4">
        <div className="m-4 md:m-14 rounded-xl border-onyx text-onyx w-screen max-w-xl xl:max-w-7xl flex-1 overflow-y-auto pb-16 md:pb-52">
          {/* Ensure the review content goes here */}
          {isLoading ? (
            <div className="animate-pulse h-full flex items-center justify-center">
              Loading AI review...
            </div>
          ) : (
            <div className="">{renderContent(reviewResult)}</div>
          )}
        </div>
      </div>

      {/* Textarea and submit button */}
      <div className="fixed bottom-0 w-full xl:w-screen items-center shadow-md p-4">
        <div className="xl:w-[1000px] items-center md:mx-auto">
          <Textarea
            ref={textareaRef}
            className="xl:w-full h-30 max-h-28 mb-2 rounded-xl"
            placeholder="Type your message here."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              resizeTextarea(); // Resize textarea on change
            }}
          />
          <div className="flex justify-end w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-full bg-frost text-onyx overflow-auto hover:scale-[101.7%] hover:bg-frost rounded-xl"
                    onClick={handleSubmitReview}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Code Review"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-onyx overflow-y-auto bg-frost rounded-xl py-2 m-2"
                >
                  <p>Submit to Code Review!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReview;
