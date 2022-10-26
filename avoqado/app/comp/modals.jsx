// All code is free, use it.
// https://gist.github.com/magalhaespaulo/737a5c35048c18b8a2209d8a9fae977c
//
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { Invisible } from "./invisible";

const effect = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      type: "linear",
      stiffness: 600,
      damping: 30,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Backdrop = ({ children, handleClose }) => (
  <motion.div
    className="
      z-50 fixed inset-0
      flex items-end justify-center      bg-black bg-opacity-50
      bg-backdrop backdrop-filter backdrop-blur-sm
    "
    onClick={handleClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const ModalContent = ({
  className,
  children,
  handleClose,
  ariaLabel,
  imgHeader,
}) => (
  <>
    <motion.div
      tabIndex={-1}
      role="dialog"
      aria-modal={true}
      aria-label={ariaLabel}
      className={`relative ${
        className ||
        " bg-white rounded-lg rounded-t-lg overflow-scroll  w-screen max-w-mobile-full m-auto place-items-center"
      }`}
      variants={effect}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(event) => event.stopPropagation()}
    >
      {imgHeader && (
        <img
          src={imgHeader}
          className=" max-h-60 w-full object-cover rounded-t-lg"
        />
      )}
      {handleClose && (
        <>
          <button
            className="absolute top-0 right-0 bg-white m-2 p-2 rounded-full"
            onClick={handleClose}
            aria-label={`Close ${ariaLabel || "dialog"}`}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
            </svg>
          </button>
          <Invisible />
        </>
      )}
      <div className="p-5">{children}</div>
    </motion.div>
  </>
);

export const Modal = ({
  children,
  className,
  isOpen,
  handleClose,
  hideCloseButton,
  backdropDismiss = true,
  onExitComplete,
  ariaLabel,
  fromBottom,
  imgHeader,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [trigger, setTrigger] = onExitComplete ?? [undefined, undefined];

  const handleKeyDown = (event) => {
    if (!isOpen || event.key !== "Escape") return;

    handleClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return <></>;

  return ReactDOM.createPortal(
    <AnimatePresence
      initial={false}
      mode="wait"
      // exitBeforeEnter={true}
      onExitComplete={() =>
        setTrigger && trigger === "fired" && setTrigger("completed")
      }
    >
      {isOpen && (
        <Backdrop handleClose={backdropDismiss ? handleClose : undefined}>
          <FocusLock>
            <ModalContent
              imgHeader={imgHeader}
              fromBottom={fromBottom}
              className={className}
              handleClose={hideCloseButton ? undefined : handleClose}
              ariaLabel={ariaLabel}
            >
              {children}
            </ModalContent>
          </FocusLock>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")
  );
};
