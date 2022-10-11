import { ChevronDownIcon } from "@heroicons/react/outline";

export let handle = { step: "step" };

export const ModalHeader = ({ title, onClose }) => {
  return (
    <div className="flex flex-row justify-between">
      <span>{title}</span>
      <button onClick={onClose}>
        <ChevronDownIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
