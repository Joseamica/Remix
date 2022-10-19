import { XIcon } from "@heroicons/react/outline";
import { ModalHeader } from "./ModalHeader";

export const ModalContainer = ({
  children,
  imgHeader,
  Cname,
  closeButton,
  setShowModal,
  modalHeader,
  modalHeaderTitle,
  cName,
  onClose,
}) => {
  return (
    <div
      className={` ${cName} bottom-0 bg-white fixed inset-x-0  rounded-t-lg h-auto max-h-max z-50 overflow-scroll `}
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
      {modalHeader && (
        <ModalHeader title={modalHeaderTitle} onClick={onClose} />
      )}
      <div className="p-5  overflow-y-scroll max-h-screen  z-50 ">
        {children}
      </div>
    </div>
  );
};
