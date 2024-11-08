"use client";
import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marked } from "marked";
import { useUser } from "@clerk/nextjs";
import { Code, History, Send, Zap } from "lucide-react";

const CodeReview = () => {
  const { user } = useUser();
  const userId = user?.id || "guest";

  const [reviewResult, setReviewResult] = useState("");
  const [parsedReviewResult, setParsedReviewResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [memory, setMemory] = useState<
    Array<{ title: string; userMessage: string; aiResponse: string }>
  >([]);

  const contentRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const storedMemories = localStorage.getItem(`codeReviewMemory_${userId}`);
    if (storedMemories) {
      setMemory(JSON.parse(storedMemories));
    }
  }, [userId]);

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [parsedReviewResult, message]);

  useEffect(() => {
    resizeTextarea();
  }, [message]);

  useEffect(() => {
    const parseReviewResult = async () => {
      if (reviewResult) {
        const parsed = await marked(reviewResult);
        setParsedReviewResult(parsed);
      }
    };
    parseReviewResult();
  }, [reviewResult]);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 300;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  };

  const getRandom4DigitNumber = () => Math.floor(1000 + Math.random() * 9000);

  const handleSubmitReview = async () => {
    setIsLoading(true);
    setReviewResult("");
    setParsedReviewResult("");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (typeof data.result === "string") {
        const userMessageCode = `<pre><code class="language-javascript">${message
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</code></pre>`;

        setReviewResult(data.result);

        const newMemory = {
          title: `Review ${getRandom4DigitNumber()}`,
          userMessage: userMessageCode,
          aiResponse: data.result,
        };

        const updatedMemory = [...memory, newMemory].slice(-5);
        setMemory(updatedMemory);
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
      setMessage("");
    }
  };

  const handleMemoryClick = async (index: number) => {
    const selectedMemory = memory[index];
    if (selectedMemory) {
      const combinedContent = `<div class="user-message-container"><strong>USER CODE</strong><br/>${selectedMemory.userMessage}</div><br/><strong>AI REVIEW</strong><br/><br/>${selectedMemory.aiResponse}`;
      setReviewResult(combinedContent);
      const parsed = await marked(combinedContent);
      setParsedReviewResult(parsed);
    }
  };

  return (
    <div className="fixed inset-0 top-[64px] bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex h-full">
        {/* Sidebar with memories */}
        <aside className="w-64 bg-gray-800 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <History className="mr-2" />
              Review History
            </h2>
            {memory.length > 0 ? (
              <ul className="space-y-2">
                {memory.map((mem, index) => (
                  <li
                    key={index}
                    className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleMemoryClick(index)}
                  >
                    {mem.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No reviews yet</p>
            )}
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4 overflow-hidden">
            <Card className="h-full overflow-hidden bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="mr-2 text-yellow-400" />
                  AI Review Results
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] overflow-hidden">
                <ScrollArea className="h-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-frost"></div>
                    </div>
                  ) : (
                    <div
                      ref={contentRef}
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: parsedReviewResult }}
                    />
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Input area */}
          <div className="p-4 bg-gray-800/50">
            <div className="max-w-3xl mx-auto">
              <Textarea
                ref={textareaRef}
                className="w-full mb-2 rounded-lg bg-gray-700 text-white border-gray-600 focus:border-frost focus:ring focus:ring-frost focus:ring-opacity-50 resize-none"
                placeholder="Paste your code here for review..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  resizeTextarea();
                }}
                style={{ maxHeight: "300px", overflowY: "auto" }}
              />
              <Button
                className="w-full bg-frost text-gray-900 hover:bg-frost/90 rounded-lg transition-colors flex items-center justify-center"
                onClick={handleSubmitReview}
                disabled={isLoading}
              >
                <Send className="mr-2" />
                {isLoading ? "Analyzing..." : "Submit for Review"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CodeReview;
