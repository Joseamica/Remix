import React from "react";

export const Button = ({ type, children, ...rest }) => {
  return (
    <button
      type={type}
      className={className(
        "p-4 justify-between flex flex-row w-full items-center bg-white shadow-md rounded-2xl text-center",
        { [className]: className }
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export const LargeButtonMain = ({ type, children, ...rest }) => {
  return (
    <button
      type={type}
      className="p-4 justify-center flex flex-row w-full items-center bg-black text-white shadow-md rounded-2xl text-center"
      {...rest}
    >
      {children}
    </button>
  );
};
