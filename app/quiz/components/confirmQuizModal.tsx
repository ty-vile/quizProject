"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import useConfirmQuizModal from "@/hooks/useConfirmQuizModal";
import { useRouter } from "next/navigation";
import { LuPartyPopper } from "react-icons/lu";
import { usePathname } from "next/navigation";

const ConfirmQuizModal = () => {
  const pathname = usePathname();
  const getPathname = pathname.split("/");

  const confirmQuizModal = useConfirmQuizModal();
  const router = useRouter();

  let bodyContent;

  // CREATE QUIZ
  if (getPathname[2] === "create-quiz") {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center justify-center w-full ">
          <div className="w-fit bg-primary rounded-full p-4">
            <LuPartyPopper className="text-5xl text-white w-fit" />
          </div>
          <h3 className="text-xl font-josefin">
            Thanks for creating a new quiz with quizify!
          </h3>
        </div>
        <div className="flex items-center w-full gap-4">
          <Button
            onClick={() => {
              router.push("/quiz/my-quizzes");
              confirmQuizModal.onClose();
            }}
            className="flex flex-1"
            variant="outline"
          >
            My Quizzes
          </Button>
          <Button
            onClick={() => {
              router.push("/dashboard");
              confirmQuizModal.onClose();
            }}
            className="flex flex-1"
          >
            Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (getPathname[2] === "take-quiz") {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center justify-center w-full ">
          <div className="w-fit bg-primary rounded-full p-4">
            <LuPartyPopper className="text-5xl text-white w-fit" />
          </div>
          <h3 className="text-xl font-josefin">
            Congratulations on taking the quiz!
          </h3>
        </div>
        <div className="flex items-center w-full gap-4">
          <Button
            onClick={() => {
              // PUSH TO RESULTS PAGE - CAN ACCESS THE ID - getPathname[3] to go to page.
              router.push("");
              confirmQuizModal.onClose();
            }}
            className="flex flex-1"
            variant="outline"
          >
            See Results
          </Button>
          <Button
            onClick={() => {
              router.push("/dashboard");
              confirmQuizModal.onClose();
            }}
            className="flex flex-1"
          >
            Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={confirmQuizModal.isOpen}
      onClose={confirmQuizModal.onClose}
      body={bodyContent}
      canClose={false}
    />
  );
};

export default ConfirmQuizModal;
