import React from "react";

export function BoxContainer({ children }) {
  return (
    <div className="p-3 bg-white drop-shadow-md rounded-2xl">{children}</div>
  );
}
