"use client";

import Modal from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import useConfirmQuizModal from "@/hooks/useConfirmQuizModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuPartyPopper } from "react-icons/lu";

type Props = {
  user: User;
};

const ConfirmQuizModal: React.FC<Props> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const confirmQuizModal = useConfirmQuizModal();
  const router = useRouter();

  const bodyContent = (
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
          onClick={() => router.push("")}
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={confirmQuizModal.isOpen}
      onClose={confirmQuizModal.onClose}
      body={bodyContent}
      canClose={false}
    />
  );
};

export default ConfirmQuizModal;
