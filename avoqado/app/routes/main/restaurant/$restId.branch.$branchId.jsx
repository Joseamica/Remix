import {
  BookOpenIcon,
  CursorClickIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import {
  LargeButtonWithIcon,
  Modal,
  ModalContainer,
  TipButton,
} from "../../../components";
import { db } from "../../../utils/db.server";
import { getTableCount, getOrderId } from "../../../models/order.server";
import { LargeButtonMain } from "~/components/ui/Buttons/Button";

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);
  const tipAmount = formData.get("tip");
  console.log(tipAmount);
  return { tipAmount };
};

export const loader = async ({ params, request }) => {
  const url = new URL(request.url);
  const path = new URL(request.url).pathname;
  console.log(path);

  const tableIdFromSearchParams = parseInt(url.searchParams.get("table"));

  const restId = parseInt(params.restId);
  const branchId = parseInt(params.branchId);

  let orderItemsOnTable = "";
  const tableCount = await getTableCount();

  if (!tableIdFromSearchParams) {
    throw new Error(
      `Mesa ${tableIdFromSearchParams} no asignada por medio de url`
    );
  }
  // Verificar si la mesa existe
  if (tableCount <= tableIdFromSearchParams) {
    throw new Error(`La mesa ${tableIdFromSearchParams} no existe.`);
  }
  const order = await getOrderId(tableIdFromSearchParams);

  if (order.length <= 0) {
    await db.order.create({
      data: {
        payed: false,
        creationDate: new Date(),
        orderedDate: new Date(),
        Table: {
          connect: {
            id: tableIdFromSearchParams,
          },
        },
      },
    });
  } else {
    orderItemsOnTable = await db.orderItem.findMany({
      where: {
        orderId: Number(order[0].id),
      },
      include: {
        MenuItem: true,
      },
    });
  }

  // if orderitems doesnt exist on the order.
  if (orderItemsOnTable <= 0) {
    totalBill = 0;
  } else {
    const total = orderItemsOnTable.map((item) => {
      return item.price * item.quantity;
    });
    totalBill = total?.reduce((a, b) => a + b);
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
    LUNCH: 23,
    DINNER: 19,
    CLOSE: 23,
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

  return {
    branch,
    restaurant,
    menu,
    tableId,
    orderItemsOnTable,
    totalBill,
  };
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
          to={`/menu/?rest=${restaurant.id}&branch=${branchInfo.id}&meal=${
            menu.meal
          }&table=${tableId.table_number <= 0 ? 9999 : tableId.table_number}`}
        >
          <p>View the menu</p>
          <BookOpenIcon className="h-5 w-5" />
        </LargeButtonWithIcon>
      </section>
      <section className="flex flex-col space-y-2">
        <h4 className="text-center ">Table {tableId.table_number}</h4>
        {/* TODO: All selected items at the table */}
        <OrderDetail />
        <Payment />

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

export const OrderDetail = () => {
  const { orderItemsOnTable, totalBill } = useLoaderData();
  // console.log(
  //   `%corderId ${orderId.id}`,
  //   "color: green; background: yellow; font-size: 30px"
  // );

  return (
    <div className="bg-white shadow-lg p-2 space-y-2 rounded-lg">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl">PAY BILL</h2>
        <h2 className="text-2xl">${totalBill}</h2>
      </div>
      <hr />

      {Array.isArray(orderItemsOnTable) &&
        orderItemsOnTable.map((orderItems) => {
          const menuItem = orderItems.MenuItem;
          return (
            <div className="w-full" key={orderItems.id}>
              <div className="flex flex-row justify-between items-center space-x-2 ">
                <div className="flex flex-row items-center space-x-4 shrink-0 ">
                  {/* Quantity */}
                  <label className="font-semibold p-0.5  text-mainTextColor rounded-lg ring-2 ring-slate-200 text-sm">
                    {orderItems.quantity}
                  </label>
                  {/* Image */}
                  <img src={menuItem.image} className="w-10 h-10 rounded-lg" />
                </div>
                {/* REVIEW si el name es muy largo, se buguea, como le hago para que se salte la linea */}
                <div className="flex w-full flex-col text-clip overflow-hidden ">
                  <p className="text-md font-semibold truncate ">
                    {menuItem.name}
                  </p>
                  <p className="text-sm truncate">
                    {/* {specs} {extraSpecs ? <>• {extraSpecs}</> : null} */}
                  </p>
                </div>
                {orderItems.quantity > 1 && (
                  <p className="text-sm text-gray-500">${orderItems.price}</p>
                )}
                <p className="text-sm">
                  ${orderItems.price * orderItems.quantity}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export const Payment = () => {
  const [typeOfPayment, setTypeOfPayment] = useState("");
  console.log(typeOfPayment);
  return (
    <>
      <LargeButtonMain onClick={() => setTypeOfPayment("split")}>
        <p>SPLIT BILL</p>
      </LargeButtonMain>
      <LargeButtonMain onClick={() => setTypeOfPayment("payFull")}>
        <p>PAY BILL</p>
      </LargeButtonMain>
      {typeOfPayment === "split" && (
        <Modal onClose={() => setTypeOfPayment(false)}>
          <ModalContainer>hola</ModalContainer>
        </Modal>
      )}
      {typeOfPayment === "payFull" && <PayFull />}
    </>
  );
};

export const PayFull = () => {
  const { totalBill } = useLoaderData();

  useEffect(() => {}, []);

  return (
    <div>
      <Form className="flex flex-row space-x-1 justify-between" method="post">
        <TipButton
          concept="Standard"
          amount="$20"
          name="tip"
          value="standard"
        />
        <TipButton concept="Generous" amount="$20" />
        <TipButton concept="Amazing" amount="$20" />
        <TipButton concept="Other" amount="$20" />
      </Form>
      <div className="flex flex-row justify-between">
        <p>subtotal</p>
        <p>${totalBill}</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>propina</p>
        <p>$$$</p>
      </div>
      <div className="flex flex-row justify-between">
        <p>Total</p>
        <p>$</p>
      </div>
    </div>
  );
};
