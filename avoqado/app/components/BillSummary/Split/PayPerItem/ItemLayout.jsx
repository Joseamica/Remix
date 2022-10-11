import React from "react";

export const ItemLayout = ({ dish, price }) => {
  return (
    <article className="bg-white rounded-xl shadow-md p-5 my-2">
      <div className="flex flex-row justify-between ">
        <h3>{dish}</h3>
        <div className="space-x-3">
          <span>${price}</span>
          <button className="h-8 w-8 ring-1 ring-gray-400  rounded-full active:bg-black focus:bg-black focus:text-white">
            <span>+</span>
          </button>
        </div>
      </div>
    </article>
  );
};
