"use client";

// components
import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
// hooks
import useConfirmQuizModal from "@/hooks/useConfirmQuizModal";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
// icons
import { LuPartyPopper } from "react-icons/lu";

const ConfirmQuizModal = () => {
  const pathname = usePathname();
  const getPathname = pathname.split("/");

  const confirmQuizModal = useConfirmQuizModal();
  const router = useRouter();

  let bodyContent;

  // CREATE QUIZ
  if (getPathname[2] === "create") {
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

  if (getPathname[2] === "take") {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center justify-center w-full ">
          <div className="w-fit bg-primary rounded-full p-4">
            <LuPartyPopper className="text-5xl text-white w-fit" />
          </div>
          <h3 className="text-xl font-josefin">
            Congratulations on completing the quiz!
          </h3>
        </div>
        <div className="flex items-center w-full gap-4">
          <Button
            onClick={() => {
              router.push(`/quiz/completed/${getPathname[3]}`);
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
