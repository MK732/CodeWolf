"use client";

import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-csharp";
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

  useEffect(() => {
    if (contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [reviewResult, message]);

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
      setReviewResult("Failed to fetch AI review.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (text: any): JSX.Element => {
    // Ensure marked.parse returns a string
    const htmlContent: any = marked.parse(text);

    return (
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center overflow-y-auto">
        <h1 className="text-xl md:p-12   md:text-4xl">AI Code Review</h1>
        <div className="mb-4 p-4 rounded-xl border-onyx text-onyx w-[340px] md:w-[1000px] h-[300px] md:h-[600px] overflow-y-auto">
          {isLoading ? (
            <div className="animate-pulse">Loading AI review...</div>
          ) : (
            <div>{renderContent(reviewResult)}</div>
          )}
        </div>
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-md">
          <div className="w-[340px] md:w-[1000px] mx-auto">
            <Textarea
              className="w-full h-40 max-h-80 mb-2 rounded-xl"
              placeholder="Type your message here."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
    </>
  );
};

export default CodeReview;
