import { useParams } from "@remix-run/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

export const Dish = ({
  image,
  description,
  name,
  onClick,
  specs,
  comments,
  price,
  dish,
}) => {
  const params = useParams();
  return (
    <>
      <button className="w-full p-2 bg-white text-left" onClick={onClick}>
        <div className="flex flex-row  justify-between">
          <div className="flex flex-col space-y-1 ">
            <h4>{name}</h4>
            <p className="text-xs clip">{description}</p>
            <p className="text-sm">{specs}</p>
            <span>${price}</span>
          </div>
          <div className="shrink-0 items-center flex ">
            <img src={image} className="h-28 w-28 rounded-lg object-cover " />
          </div>
        </div>
      </button>
    </>
  );
};
