import { motion } from "framer-motion";

export const ActionButtonElements = ({ title, icon }) => {
  return (
    <>
      <motion.button className="justify-center flex flex-col items-center w-24">
        <div className="h-12 w-12 bg-white rounded-full items-center flex justify-center">
          <div className="">{icon}</div>
        </div>
        <label className="text-white text-ellipsis ">{title}</label>
      </motion.button>
    </>
  );
};
