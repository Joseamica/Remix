import {
  BookOpenIcon,
  CursorClickIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { LargeButtonWithIcon } from "../../../components";
import { db } from "../../../utils/db.server";

export const loader = async ({ params, request }) => {
  const url = new URL(request.url);

  const tableIdFromSearchParams = parseInt(url.searchParams.get("table"));
  const tableCount = await db.table.count({});
  const restId = parseInt(params.restId);
  const branchId = parseInt(params.branchId);

  if (tableCount < tableIdFromSearchParams) {
    throw new Error(`La mesa ${tableIdFromSearchParams} no existe.`);
  }

  tableIdFromSearchParams
    ? (tableId = await db.table.findUnique({
        where: {
          // If tableid from params exist then use it if not asign a random
          id: tableIdFromSearchParams,
        },
        select: {
          table_number: true,
        },
      }))
    : (tableId = 0);

  // const tableId = await db.table.findUnique({
  //   where: {
  //     // If tableid from params exist then use it if not asign a random
  //     id: tableIdFromSearchParams ? tableIdFromSearchParams : 1,
  //   },
  //   select: {
  //     table_number: true,
  //   },
  // });

  const restaurant = await db.restaurant.findUnique({
    where: {
      id: restId,
    },
  });
  const branch = await db.branch.findMany({
    where: {
      id: branchId,
      restaurantId: restId,
    },
  });
  const mealTime = {
    BREAKFAST: 7,
    LUNCH: 12,
    DINNER: 19,
    CLOSE: 22,
  };
  const date = new Date();
  const hour_of_the_day = date.getHours();

  const menu = {
    meal: "",
  };

  //TODO get what the user chooses to be their hours from dashboard
  //TEMPORAL

  if (
    hour_of_the_day >= mealTime.BREAKFAST &&
    hour_of_the_day < mealTime.LUNCH
  ) {
    menu.meal = "breakfast";
  } else if (
    hour_of_the_day >= mealTime.LUNCH &&
    hour_of_the_day < mealTime.DINNER
  ) {
    menu.meal = "lunch";
  } else if (
    hour_of_the_day >= mealTime.DINNER &&
    hour_of_the_day < mealTime.CLOSE
  ) {
    menu.meal = "dinner";
  } else {
    menu.meal = "closed";
  }

  return { branch, restaurant, menu, tableId };
  // redirect(`/menu/?rest=${restId}&branch=${branchId}&meal=${menu.meal}`)
};

const BranchDetail = () => {
  const { branch, restaurant, menu, tableId } = useLoaderData();
  const [id] = branch;
  const [branchInfo] = branch;

  return (
    <>
      <section
        style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
        className="col-start-1 col-end-13 space-y-1"
      >
        <button className="w-full">
          {branch.map((properties) => (
            <div
              key={properties.id}
              className="flex p-2 rounded-xl items-center text-center bg-white space-x-1 overflow-hidden sm:justify-start justify-center shadow-lg"
              //   key={properties.id}
            >
              <div className="flex flex-col shrink-0">
                <img
                  className="shrink-0 sm:h-20 sm:w-20  object-contain md:h-20 md:w-20 bg-slate-300"
                  src={`${properties.ppt_image}`}
                />
                <p className="text-sm">{properties.name} </p>
              </div>
              {/* endRestaurant name and logo */}
              {/* ----INFORMATION---- */}
              <div className="shrink-0 space-y-1">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-5 w-5" />
                  <p className="text-sm">{properties.rating}</p>
                  <p className="text-sm">
                    ({properties.rating_quantity}+ ratings)
                  </p>
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
        </button>
        <LargeButtonWithIcon
          to={`/menu/?rest=${restaurant.id}&branch=${branchInfo.id}&meal=${menu.meal}`}
        >
          <p>View the menu</p>
          <BookOpenIcon className="h-5 w-5" />
        </LargeButtonWithIcon>
      </section>
      <section className="col-start-1 col-end-13">
        <h4 className="text-center">Table {tableId.table_number}</h4>
        {/* TODO: All selected items at the table */}
        {/* <Bill order={dishOrder} totalBill={totalBill} /> */}
      </section>
      <section>
        {/* {showModal.state && (
          <Modal onClose={() => setShowModal({ state: false })}>
            <ModalContainer
              imgHeader={REST_INFO.ppt_image}
              closeButton={true}
              setShowModal={setShowModal}
            >
              <div>{REST_INFO.name}</div>
              <div>{REST_INFO.phone}</div>
            </ModalContainer>
          </Modal>
        )} */}
      </section>
    </>
  );
};

export default BranchDetail;
