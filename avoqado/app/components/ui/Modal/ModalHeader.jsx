import { ChevronDownIcon } from "@heroicons/react/outline";

export let handle = { step: "step" };

export const ModalHeader = ({ title, onClose }) => {
  return (
    <header className="absolute top-0 right-0 left-0   bg-white p-4 ">
      <div className="flex flex-row justify-between  items-center ">
        <h2 className="font-medium text-lg">{title}</h2>
        <button
          onClick={onClose}
          className="bg-white p-2 justify-center items-center rounded-xl"
        >
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
