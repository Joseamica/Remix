import { isSession, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";
import { RestaurantInfoCard, OrderItemsDetail, Invisible } from "../comp/";
import {
  countOrderByTableId,
  createOrderByTableId,
  getOrderId,
} from "../models/order.server";

import { updateTipAmount } from "../models/payment.server";
import invariant from "tiny-invariant";
import { getSession, getUserId } from "../sessions";
import { LargeButtonMain } from "../components";
import { useEffect, useRef, useState } from "react";
import { OnSplit, PayFull } from "~/comp/payments";
import { Modal } from "~/comp/modals";
import {
  SplitBillMC,
  SplitTypeCustom,
  SplitTypeEqualParts,
  SplitTypePerArticle,
} from "~/comp/modals-containers";
import { LargeLinkMain } from "~/components/ui/Buttons/Button";
import {
  DecreaseQuantity,
  DeleteCartItem,
  getQuantityCartItems,
  IncreaseQuantity,
} from "~/models/cart.server";
import { getUserTotal } from "~/models/user.server";

export const loader = async ({ request, params }) => {
  const userId = await getUserId(request);

  let userT = await getUserTotal(userId);

  //TODO REPAIR
  const userTotal = userT?.total ?? 0;

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
    userTotal,
  });
};
export default function Index() {
  const { branch, table, menuId, orderedItems, error, userTotal } =
    useLoaderData();
  const { restaurant, Menu } = branch;

  const subtotal =
    orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0) ??
    0;

  return (
    <div>
      {/* <Modal showModal >Hola</Modal> */}
      <Invisible />
      <RestaurantInfoCard
        restaurant={restaurant}
        branch={branch}
        menuId={menuId}
        tableId={table.id}
        error={error}
      />
      <section className="flex flex-col my-4 space-y-3">
        <h4 className="text-center ">---Table {table.table_number}---</h4>

        {userTotal !== 0 ? (
          <OnSplit userTotal={userTotal} subtotal={subtotal} />
        ) : (
          <>
            <OrderItemsDetail
              orderItemsOnTable={orderedItems}
              subtotal={subtotal}
            />
            <Payment
              subtotal={subtotal}
              orderItemsOnTable={orderedItems}
              menuId={menuId}
              tableId={table.id}
            />
          </>
        )}
      </section>
    </div>
  );
}

export const Payment = ({ subtotal, orderItemsOnTable, menuId, tableId }) => {
  const [openPayBill, setOpenPayBill] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAnotherModal, setShowAnotherModal] = useState(false);
  const [showExtraModal, setShowExtraModal] = useState(false);

  const [splitType, setSplitType] = useState("");
  const ref = useRef();

  return (
    <>
      {/* EXPLAIN si no hay ninguna orden, mostrar boton de ordenar */}
      {subtotal <= 0 ? (
        <div>
          <LargeLinkMain to={`/menu/${menuId.id}?table=${tableId}`}>
            Order Food
          </LargeLinkMain>
        </div>
      ) : (
        <>
          <LargeButtonMain onClick={() => setShowModal(true)}>
            <p>SPLIT BILL</p>
          </LargeButtonMain>
          <LargeButtonMain onClick={() => setOpenPayBill(true)}>
            <p>PAY BILL</p>
          </LargeButtonMain>
          {openPayBill && <PayFull subtotal={subtotal} ref={ref} />}
          <Modal
            fromBottom={true}
            isOpen={showModal}
            handleClose={() => setShowModal(false)}
          >
            <SplitBillMC
              showModal={showModal}
              setShowModal={setShowModal}
              showAnotherModal={showAnotherModal}
              setShowAnotherModal={setShowAnotherModal}
              setSplitType={setSplitType}
              SplitType={splitType}
              showExtraModal={showExtraModal}
              setShowExtraModal={setShowExtraModal}
            />
          </Modal>
          <Modal
            isOpen={showAnotherModal}
            handleClose={() => setShowAnotherModal(false)}
          >
            {/* ALL MENU CONTAINERS COME FROM modals-containers.jsx */}
            {splitType === "perArticle" && (
              <SplitTypePerArticle orderItemsOnTable={orderItemsOnTable} />
            )}
            {splitType === "equalParts" && <SplitTypeEqualParts />}
          </Modal>
          {/* Este modal esta fuera del modal de arriba, para no tner que tener un modal dentro de otro modal que esta dentro de otro mdoal (3 modales) */}
          <Modal
            isOpen={showExtraModal}
            handleClose={() => {
              setShowExtraModal(false), setShowModal(false);
            }}
          >
            <SplitTypeCustom onClose={setShowExtraModal} subtotal={subtotal} />
          </Modal>
        </>
      )}
    </>
  );
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const session = await getSession(request);
  const sessionUserId = session.get("userId");
  const tip = formData.get("tip");
  const amountToPay = formData.get("amountToPay");
  const removeSplit = formData.get("removeSplit");
  if (amountToPay) {
    await db.user.update({
      where: {
        id: sessionUserId,
      },
      data: {
        total: Number(amountToPay),
      },
    });
  }

  if (removeSplit === "remove") {
    await db.user.update({
      where: {
        id: sessionUserId,
      },
      data: {
        total: null,
      },
    });
  }

  const { tableId } = params;

  const [orderId] = await getOrderId(tableId);
  await updateTipAmount(orderId.id, tip);

  const action = formData.get("action");
  const cartItem = formData.get("cartItem");
  console.log("CARTITEM", cartItem);
  const cartQuantity = Number(formData.get("cartQuantity"));

  switch (action) {
    case "increaseQuantityCart":
      await IncreaseQuantity(cartItem, cartQuantity);

      break;
    case "decreaseQuantityCart":
      await DecreaseQuantity(cartItem, cartQuantity);
      const quantityCartItem = await getQuantityCartItems(cartItem);
      if (quantityCartItem.quantity <= 0) {
        await DeleteCartItem(cartItem);
      }
      break;
  }

  return { succes: true };
};
