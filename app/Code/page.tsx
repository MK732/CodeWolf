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

const CodeReview = () => {
  const [reviewResult, setReviewResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const contentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        setReviewResult(data.result);
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

  const renderContent = (text: any): JSX.Element => {
    const htmlContent: any = marked.parse(text);

    return (
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar with additional content */}
      <div className="fixed bg-onyx text-white h-screen md:py-[68px] hidden md:block top-0 w-[340px] md:w-[300px] flex-none p-4 overflow-y-auto">
        <h1 className="text-xl md:text-4xl hover:text-frost bg-onyx mb-4">
          Code Wolf - AI Review
        </h1>
        <div>
          <h2 className="hidden md:block text-2xl my-4">Memory Section</h2>
          <p className="text-lg py-2">Placeholder</p>
          <p className="text-lg py-2">Placeholder</p>
          <p className="text-lg py-2">Placeholder</p>
          <p className="text-lg py-2">Placeholder</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 my-10 md:my-0  h-[42rem] 1440p:h-[73.6rem] 1080p:h-[51rem] flex flex-col items-center overflow-y-auto p-4">
        <div className="m-4 md:m-14 rounded-xl border-onyx text-onyx w-full max-w-7xl flex-1 overflow-y-auto pb-16 md:pb-52">
          {/* Ensure the review content goes here, beneath the additional content */}
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
      <div className="fixed bottom-0 w-screen items-center shadow-md p-4">
        <div className="md:w-[1000px] items-center mx-auto">
          <Textarea
            ref={textareaRef}
            className="w-full h-30 max-h-28 mb-2 rounded-xl"
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
