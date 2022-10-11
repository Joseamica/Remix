import React from "react";

export const Button = ({ children, ...rest }) => {
  return (
    <button
      className={className(
        "py-4 px-4 justify-between flex flex-row w-full items-center bg-white shadow-md rounded-2xl text-center",
        { [className]: className }
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
