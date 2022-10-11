import ReactDOM from "react-dom";

export function Modal({ children, modalClassName, className, onClose }) {
  if (typeof window === "undefined") return null;

  const container = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <section className="fixed top-0 z-50 h-screen w-screen ">
      <div
        onClick={onClose}
        className="absolute inset-0 z-20 bg-black bg-opacity-90 transition-opacity"
      ></div>

      <div
        className={`relative z-20 m-auto  ${
          modalClassName ? modalClassName : "h-[32rem] w-[35rem]"
        }`}
      >
        <div
          className={`h-full  rounded-lg bg-special-gray  ${
            className ? className : ""
          }`}
        >
          {children}
        </div>
      </div>
    </section>,
    container
  );
}
