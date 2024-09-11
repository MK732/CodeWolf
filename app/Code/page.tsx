"use client";
import { Textarea } from "@/components/ui/textarea";
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
const CodeReview = () => {
  const [reviewResult, setReviewResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

  const handleSubmitReview = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReviewResult(
        "AI Review: Your code looks great! Here are some detailed insights:\n- Syntax is correct\n- Efficient use of algorithms\n- Could improve variable naming for clarity\n- Consider adding more comments for maintainability"
      );
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center overflow-y-auto">
        <div className="mb-4 p-4  border rounded-xl bg-frost bg-opacity-10 border-onyx text-onyx w-[340px] md:w-[800px] h-[300px] md:h-[600px] overflow-y-auto">
          {isLoading ? (
            <div className="animate-pulse">Loading AI review...</div>
          ) : (
            <div ref={contentRef} className="whitespace-pre-line">
              {reviewResult}
            </div>
          )}
        </div>
        <div className="w-[340px] md:w-[800px]">
          <Textarea
            className="w-full h-20 max-h-80 mb-2 rounded-xl "
            placeholder="Type your message here."
          />
          <div className="flex justify-end w-full ">
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
    </>
  );
};

export default CodeReview;
