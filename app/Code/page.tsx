import { Textarea } from "@/components/ui/textarea";
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
const page = () => {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="mb-4 border bg-frost">test</div>
        <div className="w-[340px] md:w-[700px]">
          <Textarea
            className="w-full h-20 mb-2"
            placeholder="Type your message here."
          />
          <div className="flex justify-end w-full">
            <Button className="w-full bg-frost text-onyx hover:scale-[101.7%] hover:bg-frost rounded-xl">
              Send message
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
