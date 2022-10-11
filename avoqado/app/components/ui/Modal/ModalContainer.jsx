import { XIcon } from "@heroicons/react/outline";

export const ModalContainer = ({
  children,
  imgHeader,
  className,
  closeButton,
  setShowModal,
}) => {
  return (
    <div
      className={`bottom-0 bg-white fixed inset-x-0  rounded-t-lg h-auto ${className}`}
    >
      {closeButton && (
        <button onClick={() => setShowModal(false)}>
          <XIcon className="h-5 w-5" />
        </button>
      )}
      {imgHeader && (
        <img
          src={imgHeader}
          className="max-h-60 w-full object-cover rounded-t-lg"
        />
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
