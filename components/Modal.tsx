import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  modalOpen: boolean;
  close: () => void;
  open: () => void;
  onClose: () => void;
  children: React.ReactNode;
  color?: string;
}

const Modal = ({
  modalOpen,
  close,
  open,
  onClose,
  children,
  color = "bg-[#000000e1]",
}: ModalProps) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-0 left-0  w-full h-full ${color}`}
            onClick={() => {
              close(), onClose();
            }}
          ></motion.div>
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            className="bg-white  rounded-lg w-[90%] md:w-fit shadow-lg z-50 overflow-y-scroll scrollbar-thin"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
