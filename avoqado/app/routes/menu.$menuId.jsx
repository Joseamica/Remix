import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { db } from "../utils/db.server";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Modal } from "~/comp/modals";
import { CartItemsDetailMC, MenuItemDetailMC, Invisible } from "../comp/index";
import {
  createOrderItemsUsingMenuItemId,
  getOrderId,
  getOrderItemsByOrderId,
  orderItemUpdateQuantity,
} from "../models/order.server";
import {
  DecreaseQuantity,
  DeleteCartItem,
  getCartItemAndMenuItem,
  getQuantityCartItems,
  IncreaseQuantity,
} from "../models/cart.server";
import { useEffect, useRef, useState } from "react";

export const loader = async ({ request, params }) => {
  // -------> All of MENU ITEMS <----------------//
  // DELETES ORDER IF THE ORDER IS PAID AND THEN DELETES ORDERITEMS
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
  const { menuId } = params;
  const menu = await db.menu.findUnique({
    where: { id: Number(menuId) },
    include: { MenuCategories: { include: { MenuItem: true } } },
  });
  //->>>>>>>>> END MENU ITEMS<<<<<<<<<<----//

  //~~~~~~~~~~~> CART <~~~~~~~~~~~~~~//
  const url = new URL(request.url);
  const tableId = url.searchParams.get("table");

  const [order] = await getOrderId(tableId);
  const orderId = order?.id;

  const orderItem = await getCartItemAndMenuItem(orderId);

  return json({ menu, orderItem });
};

// MAIN
export default function Index() {
  const { menu, orderItem } = useLoaderData();

  const fetcher = useFetcher();
  const transition = useTransition();

  const { MenuItem } = orderItem;
  const errors = useActionData();
  const { MenuCategories } = menu;

  //USESTATE

  const [menuItem, setMenuItem] = useState("");
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  let allOrderedItems = orderItem.reduce((accumulator, object) => {
    return accumulator + object.quantity;
  }, 0);
  console.log(
    "%cmenu.$menuId.jsx line:86 menuItem",
    "color: #007acc;",
    menuItem
  );

  //USEREF
  const ref = useRef([]);

  //HANDLERS
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop - 110, //
      behavior: "smooth",
    });
  };
  const handleModals = (val) => {
    setShowModal(true);
    setModalType(val);
  };

  //USEEFFECT
  useEffect(() => {
    // EXPLAIN: elimina el quantity para que cada ves que el usuario se meta a pedir la orden salga siempre en 0
    if (!showModal.itemInfo) {
      setQuantity(1);
    }
  }, [showModal.itemInfo]);

  return (
    <>
      <Invisible />
      <h1 className="text-xl font-bold mt-4">Menu</h1>
      <div
        className="flex  bg-white  space-x-2  overflow-x-scroll whitespace-nowrap mt-2 sticky top-10 left-0 right-0 
         items-center h-auto py-4 px-2 pt-6 pb-4 drop-shadow-lg"
      >
        {MenuCategories.map((categories, index) => {
          return (
            <div
              className="rounded-full hover:scale-105 ease-in-out duration-300 px-2 font-medium text-gray-700"
              key={categories.id}
              // click y te lleva al scrollposition
              onClick={() => handleScroll(ref.current[index])}
            >
              {categories.name.toUpperCase()}
            </div>
          );
        })}
      </div>
      <div className="">
        {MenuCategories.map((categories, index) => {
          return (
            <div
              key={categories.id}
              className=" shadow-md  my-2 bg-white rounded-lg  "
              ref={(e) => {
                ref.current[index] = e;
              }}
            >
              <div
                className="flex flex-row shadow-sm justify-between "
                // onClick={() => handleHide()}
              >
                <h2 className="text-lg font-bold m-2">{categories.name}</h2>
                {/* {hide ? (
                  <ChevronUpIcon className="h-5 w-5 m-2" />
                ) : ( */}
                <ChevronDownIcon className="h-5 w-5 m-2" />
                {/* )} */}
              </div>
              {categories.MenuItem.map((item) => {
                return (
                  <button
                    className="w-full p-2 text-left"
                    onClick={() => {
                      setMenuItem(item), handleModals("ItemInfo");
                    }}
                    key={item.id}
                  >
                    <div className="flex flex-row  justify-between">
                      <div className="flex flex-col space-y-1 ">
                        <h4>{item.name}</h4>
                        <p className="text-xs clip">{item.description}</p>
                        <span>${item.price}</span>
                      </div>
                      <div className="shrink-0 items-center flex ">
                        <motion.img
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          src={item.image}
                          className="h-28 w-28 rounded-lg object-cover "
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        // EXPLAIN aqui si abre el modal ITemInfo si pasara la prop de la imagen, sino sera un empty string
        imgHeader={modalType === "ItemInfo" ? menuItem.image : ""}
      >
        {modalType == "ItemInfo" && (
          <MenuItemDetailMC
            menuItem={menuItem}
            setQuantity={setQuantity}
            quantity={quantity}
            setShowModal={setShowModal}
          />
        )}
        {modalType == "CartInfo" && <CartItemsDetailMC orderItem={orderItem} />}
      </Modal>

      {orderItem.length > 0 && (
        <button
          className="bg-black sticky text-xl mt-auto ml-auto bottom-5 right-5 rounded-full p-5 w-full text-white"
          onClick={() => handleModals("CartInfo")}
        >
          {/* {transition.submission ? "OpeningCart" : "Opened"} */}
          <p>Cart ({allOrderedItems})</p>
        </button>
      )}
    </>
  );
}

export const action = async ({ params, request }) => {
  // const { menuId } = params;
  const formData = await request.formData();
  const menuItemId = parseInt(formData.get("id"));
  const menuItemPrice = parseInt(formData.get("price"));
  const menuItemQuantity = parseInt(formData.get("quantity"));
  console.log(
    "%cmenu.$menuId.jsx aaaaaaaaaaa line:223 menuItemId",
    "color: white; background-color: #26bfa5;",
    menuItemId
  );

  //From Params get tableId -> we want the tableId to get the OrderId searching by table.
  const url = new URL(request.url);
  const tableId = url.searchParams.get("table");

  // Get orderId
  const [orderId] = await getOrderId(tableId);
  const errors = {};

  // Get orderItems that are in the order using menuItemId (get MenuItems from setMenuItems from "hidden" input)

  try {
    const [orderItemsId] =
      (await getOrderItemsByOrderId(menuItemId, orderId.id)) ?? null;

    if (!orderItemsId) {
      await createOrderItemsUsingMenuItemId(
        menuItemPrice,
        menuItemQuantity,
        menuItemId,
        orderId.id
      );
    } else {
      await orderItemUpdateQuantity(menuItemId, menuItemQuantity);
    }
  } catch (e) {
    console.error("errorcito" + e);
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>CART<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<</
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const action = formData.get("action");
  const cartItem = formData.get("cartItem");
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

  return json({ errors });
};
