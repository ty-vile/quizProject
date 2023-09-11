"use client";

// react
import { useCallback, useEffect, useState } from "react";
// icons
import { IoMdClose } from "react-icons/io";
// components
import { Button } from "../ui/button";
import ProgressBar from "../utility/ProgressBar";

interface ModalProps {
  percentage?: string;
  onClose: () => void;
  isOpen?: boolean;
  title?: string;
  body?: React.ReactElement;
  disabled?: boolean;
  current?: number;
  max?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  disabled,
  percentage,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 500);
  }, [disabled, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-scroll fixed inset-0 z-50 bg-neutral-500/70 outline-none focus:outline-none ">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full md:h-auto">
          {percentage && (
            <ProgressBar percentage={percentage} showModal={showModal} />
          )}
          {/* CONTENT */}
          <div
            className={`
          translate
          duration-300
          h-full
          ${showModal ? "translate-y-0" : "translate-y-full"}
          ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className="translate h-full md:h-auto border-0 rounded-b-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-4  justify-center relative">
                <Button
                  variant="ghost"
                  className="p-1 border-0 absolute right-8 hover:shadow-lg rounded-full"
                  onClick={handleClose}
                >
                  <IoMdClose size={32} />
                </Button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative px-6 pt-2 pb-6 flex-auto bg-background">
                {body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
