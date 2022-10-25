import { json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { db } from "../utils/db.server";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import { Modal, ModalContainer } from "~/components";
import { CartItemsDetailMC, MenuItemDetailMC, Invisible } from "../comp/index";
import {
  createOrderItemsUingMenuItemId,
  getOrderId,
  getOrderItemsByOrderId,
  orderItemUpdateQuantity,
} from "../models/order.server";
import { createOrderItem } from "../models/menu.server";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { useLocation } from "react-router-dom";

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

  const [orderId] = await getOrderId(tableId);

  const orderItem = await db.orderItem.findMany({
    where: {
      orderId: Number(orderId.id),
    },
    include: {
      MenuItem: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return json({ menu, orderItem });
};
export default function Index() {
  const { menu, orderItem } = useLoaderData();

  const fetcher = useFetcher();
  const transition = useTransition();

  // console.log(
  //   "%cmenu.$menuId.jsx line:71 fetcher",
  //   "color: white; background-color: #007acc;",
  //   fetcher
  // );
  const { MenuItem } = orderItem;
  const errors = useActionData();
  const { MenuCategories } = menu;

  //USESTATE
  const [scroll, setScroll] = useState();
  const [menuItem, setMenuItem] = useState();
  const [showModal, setShowModal] = useState({
    itemInfo: false,
    cartInfo: false,
  });
  const [quantity, setQuantity] = useState(1);

  //USEREF
  const ref = useRef([]);

  //HANDLERS
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop - 110, //
      behavior: "smooth",
    });
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
                      setMenuItem(item);
                      setShowModal({ itemInfo: true });
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
      {showModal.itemInfo && (
        <Modal
          onClose={() => setShowModal({ itemInfo: false })}
          modalClassName={true}
        >
          <ModalContainer imgHeader={menuItem.image}>
            <MenuItemDetailMC
              menuItem={menuItem}
              setQuantity={setQuantity}
              quantity={quantity}
            />
          </ModalContainer>
        </Modal>
      )}
      {showModal.cartInfo && (
        <Modal
          onClose={() => setShowModal({ cartInfo: false })}
          modalClassName={false}
        >
          <ModalContainer
            cName=" bg-[#FCFDFD]"
            modalHeader={true}
            modalHeaderTitle="Cart"
            onClose={() => setShowModal({ cartInfo: false })}
          >
            <CartItemsDetailMC orderItem={orderItem} />
          </ModalContainer>
        </Modal>
      )}
      <button
        className="bg-black sticky text-xl mt-auto ml-auto bottom-5 right-5 rounded-full p-5 w-full text-white"
        onClick={() => setShowModal({ cartInfo: true })}
        disabled={transition.submission}
      >
        {/* {transition.submission ? "OpeningCart" : "Opened"} */}
        <p>Cart ({orderItem ? orderItem.length : 0})</p>
      </button>
    </>
  );
}

export const action = async ({ params, request }) => {
  // const { menuId } = params;
  const formData = await request.formData();
  const menuItemId = parseInt(formData.get("id"));
  const menuItemPrice = parseInt(formData.get("price"));
  const menuItemQuantity = parseInt(formData.get("quantity"));
  const submitItemToOrder = formData.get("submit");

  //From Params get tableId -> we want the tableId to get the OrderId searching by table.
  const url = new URL(request.url);
  const tableId = url.searchParams.get("table");

  // Get orderId
  const [orderId] = await getOrderId(tableId);
  const errors = {};

  // Get orderItems that are in the order using menuItemId (get MenuItems from setMenuItems from "hidden" input)

  try {
    const [orderItemsId] = await getOrderItemsByOrderId(menuItemId, orderId.id);
    if (!orderItemsId) {
      await createOrderItemsUingMenuItemId(
        menuItemPrice,
        menuItemQuantity,
        menuItemId,
        orderId.id
      );
    } else {
      await orderItemUpdateQuantity(menuItemId, menuItemQuantity);
    }
  } catch (e) {
    console.error(e);
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>CART<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<</
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const action = formData.get("action");
  const cartItem = formData.get("cartItem");
  const cartQuantity = Number(formData.get("cartQuantity"));
  console.log(cartItem, cartQuantity);

  switch (action) {
    case "increaseQuantityCart":
      await db.orderItem.update({
        where: {
          id: Number(cartItem),
        },
        data: {
          quantity: cartQuantity + 1,
        },
      });
      break;
    case "decreaseQuantityCart":
      await db.orderItem.update({
        where: {
          id: Number(cartItem),
        },
        data: {
          quantity: cartQuantity - 1,
        },
      });
      const quantityCartItem = await db.orderItem.findUnique({
        where: {
          id: Number(cartItem),
        },
        select: {
          quantity: true,
        },
      });
      if (quantityCartItem.quantity <= 0) {
        await db.orderItem.delete({
          where: {
            id: Number(cartItem),
          },
        });
      }
      break;
  }

  return json({ errors });
};
