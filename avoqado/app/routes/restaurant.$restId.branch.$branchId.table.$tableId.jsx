import { isSession, json } from "@remix-run/node";
import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import { db } from "../utils/db.server";
import {
  RestaurantInfoCard,
  OrderItemsDetail,
  TipButton,
  BoxContainer,
} from "../comp/";
import {
  countOrderByTableId,
  createOrderByTableId,
  getOrderId,
} from "../models/order.server";

import { updateTipAmount } from "../models/payment.server";
import invariant from "tiny-invariant";
import {
  getSession,
  commitSession,
  getUserId,
  createUserSession,
  // createUserSession,
  // getUserId,
} from "../sessions";
import { LargeButtonMain } from "../components";
import { useEffect, useState } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { Modal } from "../comp/modals";
import { v4 as uuidv4 } from "uuid";

export const loader = async ({ request, params }) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  invariant(params.branchId, "expected params.branchID");
  invariant(params.tableId, "expected params.tableId");

  try {
    await db.order.deleteMany({
      where: {
        paid: true,
      },
    });
    await db.orderItem.deleteMany({
      where: {
        orderId: null,
      },
    });
  } catch (e) {
    console.error("order or orderitem couldnt be deleted");
  }

  const error = {};

  // Find branch and tables with params
  const { branchId, tableId } = params;
  const [branch, table] = await Promise.all([
    db.branch.findUnique({
      where: { id: Number(branchId) },
      include: { restaurant: true, Menu: true },
    }),
    db.table.findUnique({
      where: { id: tableId },
      include: { Order: true },
    }),
  ]);
  // ERRORS //

  // CREATE ORDER RELATED //
  const [order] = await getOrderId(table?.id);

  try {
    const orderCount = await countOrderByTableId(table.id);
    // SI LA ORDEN ESTA VACIA CREAR UNA
    orderCount <= 0
      ? await createOrderByTableId(table.id)
      : // SI EXISTE LA ORDEN, SACAR TODOS LOS items dentro
        (orderedItems = await db.orderItem.findMany({
          where: {
            orderId: Number(order.id),
          },
          include: {
            MenuItem: true,
          },
        }));
  } catch (err) {
    console.error(err);
  }

  try {
    await db.user.upsert({
      where: { id: userId || userId },
      update: {
        Order: {
          connect: { id: order.id },
        },
      },
      create: {
        id: userId,
        Order: {
          connect: { id: order.id },
        },
      },
    });
  } catch (e) {
    console.error(e);
  }

  const asignMenu = () => {
    const timeNow = new Date().getHours();
    const breakfast_start = branch?.breakfast;
    const lunch_start = branch?.lunch;
    const dinner_start = branch?.dinner;
    const close_restaurant = 22;

    const menu = {
      meal: "",
    };

    //TODO get what the user chooses to be their hours from dashboard
    //TEMPORAL
    if (timeNow >= breakfast_start && timeNow < lunch_start) {
      menu.meal = "breakfast";
    } else if (timeNow >= lunch_start && timeNow < dinner_start) {
      menu.meal = "lunch";
    } else if (timeNow >= dinner_start && timeNow < close_restaurant) {
      menu.meal = "dinner";
    } else {
      menu.meal = "closed";
    }
    return menu;
  };
  const menu = asignMenu();

  if (menu.meal === "closed") {
    error.closed = `Restaurante cerrado, vuelva a las ${branch.breakfast} a.m.`;
  }
  const [menuId] = await db.menu.findMany({
    where: {
      branchId: branch.id,
      name: menu.meal,
    },
  });

  return json({
    branch,
    table,
    menuId,
    orderedItems,
    error,
  });
};
export default function Index() {
  const { branch, table, menuId, orderedItems, error } = useLoaderData();
  const { restaurant, Menu } = branch;

  // FIX No se si es correcto asi sacar el total quantity*price
  const subtotal =
    orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0) ??
    0;

  return (
    <div>
      {/* <Modal showModal >Hola</Modal> */}
      <RestaurantInfoCard
        restaurant={restaurant}
        branch={branch}
        menuId={menuId}
        tableId={table.id}
        error={error}
      />
      <section className="flex flex-col my-4 space-y-3">
        <h4 className="text-center ">---Table {table.table_number}---</h4>
        <OrderItemsDetail
          orderItemsOnTable={orderedItems}
          subtotal={subtotal}
        />
        <Payment subtotal={subtotal} />
      </section>
    </div>
  );
}

export const Payment = ({ subtotal }) => {
  const [typeOfPayment, setTypeOfPayment] = useState("");

  const handleModal = (value) => {
    setTypeOfPayment(value);
  };

  return (
    <>
      <LargeButtonMain onClick={() => handleModal("split")}>
        <p>SPLIT BILL</p>
      </LargeButtonMain>
      <LargeButtonMain onClick={() => handleModal("payFull")}>
        <p>PAY BILL</p>
      </LargeButtonMain>
      {/* {typeOfPayment === "split" && (
        <Modals
          onClose={() => setTypeOfPayment("")}
          setTypeOfPayment={setTypeOfPayment}
        />
      )}*/}
      {typeOfPayment === "payFull" && <PayFull subtotal={subtotal} />}
    </>
  );
};

export const PayFull = ({ subtotal }) => {
  const [tip, setTip] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const tipObj = {
    standard: subtotal * 0.1,
    generous: subtotal * 0.12,
    amazing: subtotal * 0.18,
  };

  useEffect(() => {
    setGrandTotal(subtotal + tip);
  }, [tip]);

  return (
    <>
      <BoxContainer>
        <h2 className="text-xl my-2">Would you like to leave a tip?</h2>
        <div className="flex flex-row space-x-1 justify-between">
          <TipButton val="standard" onClick={() => setTip(tipObj.standard)}>
            <h3 className="text-black text-xs">Standard</h3>
            <h4 className="font-medium text-sm">
              {tipObj.standard.toLocaleString("en-US")}
            </h4>
          </TipButton>
          <TipButton val="generous" onClick={() => setTip(tipObj.generous)}>
            <h3 className="text-black text-xs">Generous</h3>
            <h4 className="font-medium text-sm">
              {tipObj.generous.toLocaleString("en-US")}
            </h4>
          </TipButton>

          <TipButton val="amazing" onClick={() => setTip(tipObj.amazing)}>
            <h3 className="text-black text-xs">Amazing</h3>
            <h4 className="font-medium text-sm">
              {tipObj.amazing.toLocaleString("en-US")}
            </h4>
          </TipButton>
        </div>
      </BoxContainer>
      <BoxContainer>
        <div className="">
          <div className="flex flex-row justify-between ">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Tip</p>
            <p>${tip.toFixed(2)}</p>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row justify-between">
            <p className="text-2xl">Total</p>
            <p className="text-2xl">${tip ? grandTotal : subtotal}</p>
          </div>
        </div>
      </BoxContainer>
      <Form method="POST">
        <input type="hidden" name="tip" value={tip} />
        <LargeButtonMain type="submit">PAY $ {grandTotal}</LargeButtonMain>
      </Form>
    </>
  );
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const userId = await getUserId(session);
  console.log(userId);
  const { tableId } = params;

  const tip = formData.get("tip");
  console.log(tip);
  const [orderId] = await getOrderId(tableId);
  console.log(orderId);
  await updateTipAmount(orderId.id, tip);

  return { succes: true };
};
