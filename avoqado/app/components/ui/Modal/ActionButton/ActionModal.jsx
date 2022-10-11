import {
  CheckCircleIcon,
  PencilAltIcon,
  SortAscendingIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ActionButtonElements } from "../../../ui/Buttons/ActionButtonElements";

export const ActionModal = ({ onClick }) => {
  return (
    <>
      <div className="flex justify-center mt-2">
        <button
          className="bg-white p-5 rounded-full h-14 w-14 justify-center m-auto"
          onClick={onClick}
        >
          <XIcon />
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-evenly m-10 fixed bottom-10 inset-x-0 ">
        <ActionButtonElements
          title="Waitress"
          icon={<PencilAltIcon className="w-7 h-7" />}
        />
        <ActionButtonElements
          title="Report"
          icon={<CheckCircleIcon className="w-7 h-7" />}
        />
        <ActionButtonElements
          title="Wifi"
          icon={<SortAscendingIcon className="w-7 h-7" />}
        />
      </div>
    </>
  );
};
