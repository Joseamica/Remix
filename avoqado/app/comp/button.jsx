import { ButtonHTMLAttributes } from "react";

export const TipButton = ({ val, children, onClick, className = "" }) => {
  return (
    <button
      name="tip"
      value={val}
      className={`flex flex-col border-slighlyGray border-solid border 
    items-center text-left p-2 rounded-md min-w-[20%] focus:ring-2 focus:ring-black bg-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const LargeButtonMain = ({ n, val, type, children, ...rest }) => {
  return (
    <button
      name={n}
      value={val}
      type={type}
      className="p-4 justify-center flex flex-row w-full items-center bg-black text-white shadow-md rounded-2xl text-center"
      {...rest}
    >
      {children}
    </button>
  );
};
