import { Textarea } from "@/components/ui/textarea";
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const page = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="mb-4 border bg-frost">test</div>
        <div className="w-[340px] md:w-[700px]">
          <Textarea
            className="w-full h-20 mb-2 rounded-xl"
            placeholder="Type your message here."
          />
          <div className="flex justify-end w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="w-full bg-frost text-onyx hover:scale-[101.7%] hover:bg-frost rounded-xl">
                    Submit Code Review
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-onyx bg-frost rounded-xl py-2 m-2"
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

export default page;
