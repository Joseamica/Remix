import React from "react";

export const CategoriesMenuButton = ({
  title,
  category,
  setCategorie,
  id,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className="w-full h-12  rounded-full hover:scale-105 ease-in-out duration-300 px-1 "
    >
      <label className=" p-2">{title}</label>
    </button>
  );
};
