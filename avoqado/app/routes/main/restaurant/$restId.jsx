import { redirect } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import React from "react";
import { db } from "../../../utils/db.server";

export const loader = async ({ request, params }) => {
  const restCount = await db.restaurant.count();

  const restId = parseInt(params.restId);
  const restaurant = await db.restaurant.findMany({
    where: {
      id: restId,
    },
  });

  if (params.restId > restCount) {
    throw new Error(`Restaurant id not found`, { status: 404 });
  }
  const branches = await db.branch.findMany({
    where: {
      restaurantId: restId,
    },
  });

  return { restaurant, branches };
};

const RestaurantDetail = () => {
  const { restaurant, branches } = useLoaderData();
  const [restInfo] = restaurant;

  return (
    <div className="col-start-1 col-end-13 bg-slate-400">
      Branches (2)
      {branches.map((branch) => {
        return (
          <Link
            key={branch.id}
            to={`/main/restaurant/${restInfo.id}/branch/${branch.id}`}
            className="bg-black text-white"
          >
            <p>{branch.name}</p>
            <img src={branch.ppt_image} className="w-20 h-20" />
            <p>Phone: {branch.phone}</p>
          </Link>
        );
      })}
    </div>
  );
};

//EXPLAIN If i want to see all the json on web comment below
export default RestaurantDetail;
