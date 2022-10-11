import React from "react";

export const DishLayout = ({
  description,
  image,
  meal,
  name,
  price,
  specs,
}) => {
  // const name = "test";
  const quantity = 1;
  // const specs = "etc";
  const extraSpecs = "Hola";
  // const price = 12;

  return (
    <div className="w-full p-1">
      <div className="flex flex-row justify-between items-center space-x-2 ">
        <div className="flex flex-row items-center space-x-4 shrink-0 ">
          {/* Quantity */}
          <label className="font-semibold p-0.5 bg-slate-100 text-mainTextColor rounded-lg ring-2 ring-slate-200 text-sm">
            {quantity}
          </label>
          {/* Image */}
          <img src={image} className="w-10 h-10 rounded-lg" />
        </div>
        {/* REVIEW si el name es muy largo, se buguea, como le hago para que se salte la linea */}
        <div className="flex w-full flex-col text-clip overflow-hidden bg-purple-50">
          <p className="text-md font-semibold truncate ">{name}</p>
          <p className="text-sm truncate">
            {/* {specs} {extraSpecs ? <>• {extraSpecs}</> : null} */}
          </p>
        </div>
        <p className="text-sm">${price}</p>
      </div>
    </div>
  );
};
