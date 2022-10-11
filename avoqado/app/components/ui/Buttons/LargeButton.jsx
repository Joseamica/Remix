import React from "react";

export const LargeButton = ({ children, className, ...rest }) => {
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
};
