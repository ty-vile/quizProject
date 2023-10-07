import { create } from "zustand";

interface ConfirmQuizModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmQuizModal = create<ConfirmQuizModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useConfirmQuizModal;
