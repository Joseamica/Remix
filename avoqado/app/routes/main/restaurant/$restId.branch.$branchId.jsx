import {
  BookOpenIcon,
  CursorClickIcon,
  PhoneIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import {
  LargeButtonWithIcon,
  Modal,
  ModalContainer,
  ModalHeader,
} from "../../../components";
import { db } from "../../../utils/db.server";
import { getTableCount, getOrderId } from "../../../models/order.server";
import { LargeButtonMain } from "~/components/ui/Buttons/Button";

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);
  const tableIdFromSearchParams = parseInt(url.searchParams.get("table"));
  const totalBill = Number(formData.get("totalBill"));
  const orderId = await db.order.findMany({
    where: {
      tableId: tableIdFromSearchParams,
    },
    select: {
      id: true,
    },
  });

  const tipAmount = formData.get("tipAmount");
  const tip = formData.get("tip");
  console.log("TIP", tipAmount);
  console.log(tip);

  switch (tip) {
    case "standard":
      await db.order.update({
        where: { id: orderId[0].id },
        data: {
          tip: Number(0.1 * totalBill),
        },
      });
      break;
    case "generous":
      await db.order.update({
        where: { id: orderId[0].id },
        data: {
          tip: Number(0.12 * totalBill),
        },
      });
      break;
    case "amazing":
      await db.order.update({
        where: { id: orderId[0].id },
        data: {
          tip: Number(0.18 * totalBill),
        },
      });
      break;
  }

  return { tip };
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

  const tipAmount = await db.order.findUnique({
    where: {
      id: order[0].id,
    },
    select: {
      tip: true,
    },
  });

  const menuItemsOnOrder = await db.orderItem.findMany({
    where: {
      orderId: Number(order[0].id),
    },
    select: {
      MenuItem: true,
    },
  });

  return {
    branch,
    restaurant,
    menu,
    tableId,
    orderItemsOnTable,
    totalBill,
    tipAmount,
    menuItemsOnOrder,
  };
  // redirect(`/menu/?rest=${restId}&branch=${branchId}&meal=${menu.meal}`)
};

const BranchDetail = () => {
  const { branch, restaurant, menu, tableId } = useLoaderData();
  console.log(restaurant);
  // const [id] = branch;
  const [branchInfo] = branch;

  return (
    <>
      <section
        style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
        className="space-y-1 bg-white drop-shadow-lg rounded-2xl mt-4"
      >
        {branch.map((properties) => (
          <div key={properties.id}>
            <button className="w-full drop-shadow-md">
              <div className="relative">
                <img
                  src={properties.ppt_image}
                  className="max-h-60 w-full object-cover rounded-t-2xl"
                />
                {/* <img
                src="https://madre-cafe.com/wp-content/uploads/2021/11/logo-madre-cafe-header.svg"
                className=" bg-white "
              /> */}
              </div>

              <div
                className="flex flex-row p-4 rounded-b-xl text-left   
              overflow-hidden sm:justify-start justify-between space-y-2 "
                //   key={properties.id}
              >
                <div className="flex flex-row shrink-0 space-x-2 justify-between">
                  <img
                    className="shrink-0  object-contain h-24 w-24 rounded-full drop-shadow-sm bg-white"
                    src={`${restaurant.logo}`}
                  />
                  <div className="flex flex-row space-x-2">
                    {/* <p className="text-lg">{restaurant.name} </p> */}
                    {/* <label> • </label>
                  <p className="text-lg font-medium">{properties.name} </p> */}
                  </div>
                  <div className="flex flex-row space-x-2"></div>
                </div>
                {/* endRestaurant name and logo */}
                {/* ----INFORMATION---- */}
                <div className="shrink-0 space-y-1">
                  {/* Rating */}
                  <div className="flex flex-row space-x-2 items-center">
                    <p className="text-lg font-lg">{restaurant.name} </p>
                    {/* EXPLAIN If Restaurant and branch are the same doesnt show branch name */}
                    {!restaurant.name.trim() === properties.name.trim() && (
                      <>
                        <label> • </label>
                        <p className="text-md ">{properties.name} </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* <StarIcon className="h-5 w-5" /> */}
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
                    {/* <CursorClickIcon className="h-5 w-5" /> */}
                    <p className="text-sm ">
                      {properties.address} • {properties.extraAddress} •{" "}
                      {properties.city}
                      {/* •{" "}
                {properties.zipCode} */}
                    </p>
                  </div>
                  {/* endLocation */}
                  {/* Distance */}
                </div>
                {/* endDistance */}
              </div>
            </button>
            <hr />
            <LargeButtonWithIcon
              to={`/menu/?rest=${restaurant.id}&branch=${branchInfo.id}&meal=${
                menu.meal
              }&table=${
                tableId.table_number <= 0 ? 9999 : tableId.table_number
              }`}
            >
              <p>View the menu</p>
              <BookOpenIcon className="h-5 w-5" />
            </LargeButtonWithIcon>
            <hr />

            <button className="py-4 px-4 justify-between flex flex-row w-full items-center  rounded-2xl text-center">
              <a href={`tel://${properties.phone}`}>
                Contact {restaurant.name}
              </a>
              <PhoneIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </section>
      <section className="flex flex-col my-4 space-y-3">
        <h4 className="text-center ">Table {tableId.table_number}</h4>
        {/* TODO: All selected items at the table */}
        <OrderItemsDetail />
        <Payment />

        {/* <Bill order={dishOrder} totalBill={totalBill} /> */}
      </section>
      <section></section>
    </>
  );
};

export default BranchDetail;

export const OrderItemsDetail = () => {
  const { orderItemsOnTable, totalBill } = useLoaderData();
  // console.log(
  //   `%corderId ${orderId.id}`,
  //   "color: green; background: yellow; font-size: 30px"
  // );

  return (
    <div className="bg-white shadow-lg p-2 space-y-2 rounded-lg ">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl">Bill</h2>
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
        <Modals onClose={() => setTypeOfPayment("")} />
      )}
      {typeOfPayment === "payFull" && <PayFull />}
    </>
  );
};

export const PayFull = () => {
  const { totalBill, tipAmount } = useLoaderData();
  const [tip, setTip] = useState(0);
  const fetcher = useFetcher();
  console.log(tipAmount);

  const tipObj = {
    standard: totalBill * 0.1,
    generous: totalBill * 0.12,
    amazing: totalBill * 0.18,
  };

  return (
    <>
      <fetcher.Form
        method="POST"
        className="space-y-4 bg-white rounded-lg p-2 drop-shadow-lg"
      >
        <h2 className="text-xl">Would you like to leave a tip?</h2>
        <div className="flex flex-row space-x-1 justify-between">
          <input type="hidden" name="tipAmount" value={tip} />
          <TipButton val="standard">
            <h3 className="text-black text-xs">Standard</h3>
            <h4 className="font-medium text-sm">
              {tipObj.standard.toLocaleString("en-US")}
            </h4>
          </TipButton>
          <TipButton val="generous">
            <h3 className="text-black text-xs">Generous</h3>
            <h4 className="font-medium text-sm">
              {tipObj.generous.toLocaleString("en-US")}
            </h4>
          </TipButton>

          <TipButton val="amazing">
            <h3 className="text-black text-xs">Amazing</h3>
            <h4 className="font-medium text-sm">
              {tipObj.amazing.toLocaleString("en-US")}
            </h4>
          </TipButton>

          <button
            name="tip"
            value="custom"
            className="flex flex-col border-slighlyGray border-solid border 
        items-center text-left p-2 rounded-md min-w-[20%] focus:ring-2 focus:ring-black bg-white"
          >
            🚀
          </button>

          <input type="hidden" name="totalBill" value={totalBill} />
        </div>
        <div className="">
          <div className="flex flex-row justify-between ">
            <p>Subtotal</p>
            <p>${totalBill}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Tip</p>
            <p>${tipAmount.tip}</p>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row justify-between">
            <p className="text-2xl">Total</p>
            <p className="text-2xl">
              ${tipAmount.tip && totalBill + Number(tipAmount.tip)}
            </p>
          </div>
        </div>
      </fetcher.Form>
      <LargeButtonMain onClick={() => setTypeOfPayment("split")}>
        <p>PAY</p>
      </LargeButtonMain>
    </>
  );
};

export const TipButton = ({ val, children }) => {
  return (
    <button
      name="tip"
      value={val}
      className="flex flex-col border-slighlyGray border-solid border 
  items-center text-left p-2 rounded-md min-w-[20%] focus:ring-2 focus:ring-black bg-white"
    >
      {children}
    </button>
  );
};

export const Modals = ({ onClose }) => {
  const [showModal, setShowModal] = useState("");
  const { menuItemsOnOrder, orderItemsOnTable } = useLoaderData();
  // console.log(orderItemsOnTable);

  useEffect(() => {
    const orderItemsQuantity = orderItemsOnTable.map((orderItem, i) => {
      const quantity = orderItem.quantity;
      const price = orderItem.MenuItem.price;
      const obj = quantity;
      return obj;
    });
    console.log(orderItemsOnTable);

    const a = orderItemsQuantity.forEach((x, i) => {
      console.log("x", x);
      var obj = [];

      for (let i = 0; i <= x; i++) {
        // console.log("orderitem", orderItemsOnTable[i]);
        obj.push(orderItemsOnTable[i]);
      }
      console.log(obj);
    });

    // const obj = orderItemsQuantity.reduce((acumulator, value) => {
    //   return { ...acumulator, [value]: "" };
    // });
    // console.log(obj);
  }, []);

  return (
    <>
      <Modal onClose={onClose}>
        <ModalContainer modalHeader={true} modalHeaderTitle="Split">
          <div className="space-y-2">
            <LargeButtonMain onClick={() => setShowModal("perArticle")}>
              <p>Pay per article</p>
            </LargeButtonMain>
            <LargeButtonMain onClick={() => setShowModal("equal")}>
              <p>Split in equal parts</p>
            </LargeButtonMain>
            <LargeButtonMain onClick={() => setShowModal("custom")}>
              <p>Pay a custom amount</p>
            </LargeButtonMain>
          </div>
        </ModalContainer>
      </Modal>
      {showModal && (
        <Modal onClose={() => setShowModal("")}>
          <ModalContainer>
            {showModal === "perArticle" && (
              <div>
                {Array.isArray(menuItemsOnOrder) &&
                  menuItemsOnOrder.map((orderItems) => {
                    return (
                      <div className="w-full" key={orderItems.id}>
                        <div className="flex flex-row justify-between items-center space-x-2 ">
                          <div className="flex flex-row items-center space-x-4 shrink-0 ">
                            {/* Quantity */}
                            <label className="font-semibold p-0.5  text-mainTextColor rounded-lg ring-2 ring-slate-200 text-sm">
                              {orderItems.MenuItem.name}
                            </label>
                            {/* Image */}
                            <img
                              src={orderItems.image}
                              className="w-10 h-10 rounded-lg"
                            />
                          </div>
                          {/* REVIEW si el name es muy largo, se buguea, como le hago para que se salte la linea */}
                          <div className="flex w-full flex-col text-clip overflow-hidden ">
                            <p className="text-md font-semibold truncate ">
                              {/* {menuItem.name} */}
                            </p>
                            <p className="text-sm truncate">
                              {/* {specs} {extraSpecs ? <>• {extraSpecs}</> : null} */}
                            </p>
                          </div>

                          <p className="text-sm">${orderItems.price}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {showModal === "equal" && <div>equal</div>}
            {showModal === "custom" && <div>custom</div>}
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};
