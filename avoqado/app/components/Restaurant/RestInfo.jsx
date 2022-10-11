import {
  StarIcon,
  LocationMarkerIcon,
  CursorClickIcon,
} from "@heroicons/react/outline";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

// TODO
/**
 * controlar errores (try catch - solo con async await)
 * controlar errores con promises
 * poner la informacion de restaurantes - estilos
 * idle, in progress, done, error (patron de diseno => state machine)
 * ESTUDIAR:
 * rutas, tratar de hacer unas rutas publicas y privadas.
 **/

export const RestInfo = ({ branch, logo }) => {
  return (
    <>
      {branch.map((properties) => (
        <div
          key={properties.id}
          className="flex p-2 rounded-xl items-center text-center bg-white space-x-1 overflow-hidden sm:justify-start justify-center shadow-lg"
          //   key={properties.id}
        >
          <div className="flex flex-col shrink-0">
            <img
              className="shrink-0 sm:h-20 sm:w-20  object-contain md:h-20 md:w-20"
              src={`${properties.ppt_image}`}
            />
            {/* <p className="text-sm">{restaurant.name} </p> */}
          </div>
          {/* endRestaurant name and logo */}
          {/* ----INFORMATION---- */}
          <div className="shrink-0 space-y-1">
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <StarIcon className="h-5 w-5" />
              <p className="text-sm">{properties.rating}</p>
              <p className="text-sm">({properties.rating_quantity}+ ratings)</p>
              <label>•</label>
              <span className="text-sm">{properties.cuisine}</span>
            </div>
            {/* endRating */}
            {/* Location */}
            <div className="flex flex-row space-x-1  ">
              <CursorClickIcon className="h-5 w-5" />
              <p className="text-sm ">
                {properties.address} • {properties.extraAddress}
                {/* •{" "}
                {properties.zipCode} */}
              </p>
            </div>
            {/* endLocation */}
            {/* Distance */}
            <div className="flex items-center space-x-1">
              {/* <LocationMarkerIcon className="h-5 w-5" /> */}
              <p className="text-sm">{properties.pricing}</p>
            </div>
            {/* endDistance */}
          </div>
        </div>
      ))}
      {/* Restaurant name and logo */}
      {/* {restaurant.map((props) => (
          <div>{props.name}</div>
        ))} */}
    </>
  );
};
