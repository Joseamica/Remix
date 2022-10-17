import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { json } from "@remix-run/node";
import { BiMenuAltLeft } from "@react-icons/all-files/bi/BiMenuAltLeft";

import { AnimatePresence, motion, useScroll } from "framer-motion";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
} from "@heroicons/react/outline";

import { db } from "../../utils/db.server";
import {
  MainHeader,
  Modal,
  ModalContainer,
  ModalHeader,
} from "../../components";
import {
  createOrder,
  createOrderItem,
  deleteOrder,
  getOrderId,
} from "~/models/menu.server";

//ACTION!
export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);
  const tableIdFromParams = parseInt(url.searchParams.get("table"));
  // menuItem.id sended via orderDish modal
  const id = parseInt(formData.get("id"));
  const quantity = parseInt(formData.get("quantity"));
  const price = parseInt(formData.get("price"));
  const submit = formData.get("submit");

  // PART CART
  const action = formData.get("action");
  const menuItemId = formData.get("cartItem");
  const menuIId = parseInt(formData.get("menuItemId"));

  // switch (action) {
  //   case "increaseQuantityCart":
  //     const newQuantity = 1;
  //     const orderItemQuantity = await db.orderItem.findFirst({
  //       where: {
  //         menuItemId: menuIId,
  //       },
  //       select: {
  //         quantity: true,
  //       },
  //     });
  //     const sum = parseInt(orderItemQuantity.quantity) + newQuantity;
  //     console.log("SUM!", sum);
  //     await db.orderItem.update({
  //       data: {
  //         quantity: sum,
  //       },
  //       where: {
  //         id: Number(menuItemId),
  //       },
  //     });
  //     break;
  //   case "decreaseQuantityCart": {
  //     const newQuantity = -1;
  //     const orderItemQuantity = await db.orderItem.findFirst({
  //       where: {
  //         menuItemId: menuIId,
  //       },
  //       select: {
  //         quantity: true,
  //       },
  //     });
  //     const sum = parseInt(orderItemQuantity.quantity) + newQuantity;
  //     console.log("SUM!", sum);
  //     await db.orderItem.update({
  //       data: {
  //         quantity: sum,
  //       },
  //       where: {
  //         id: Number(menuItemId),
  //       },
  //     });
  //     break;
  //   }
  // }

  const errors = {};

  // PART ADD ORDERITEM
  if (quantity === 0) {
    errors.msg = "Agrega mas de un platillo";
    return json(errors);
  }

  if (!tableIdFromParams) {
    throw new Error("table id no definido", { status: 404 });
  }

  if (submit === "submit") {
    const orderId = await getOrderId(tableIdFromParams);

    // EXPLAIN = if order doesnt exists create
    if (Array.isArray(orderId.Order) && orderId.Order.length === 0) {
      await createOrder(price, quantity, id, tableIdFromParams);
    } else if (orderId.Order[0].payed === false) {
      const orderItemId = await db.orderItem.findMany({
        where: {
          menuItemId: id,
        },
      });
      //EXPLAIN if menuitem === id provided (if id is the same id)
      if (id !== orderItemId[0]?.menuItemId) {
        await createOrderItem(price, quantity, id, orderId.Order[0].id);
        // EXPLAIN else if orderItem exists then add more to the same orderitem.
      } else {
        await db.orderItem.updateMany({
          where: {
            menuItemId: id,
          },
          data: {
            quantity: { increment: quantity },
          },
        });
      }
    } else if (orderId.Order[0].payed === true) {
      await deleteOrder(orderId.Order[0].id);
    } else {
      throw new Error("mesa no existe", { status: 404 });
    }
  }

  return json({ errors });
};

//HEADER CHANGES useMatch()
export const handle = {
  changeHeader: true,
};

//LOADER
export const loader = async ({ params, request }) => {
  await db.order.deleteMany({
    where: {
      payed: true,
    },
  });
  const url = new URL(request.url);
  const tableIdFromParams = parseInt(url.searchParams.get("table"));
  const order = await db.table.findFirst({
    where: {
      id: tableIdFromParams,
    },

    select: {
      Order: {
        where: {
          tableId: tableIdFromParams,
        },
        select: {
          OrderItem: {
            include: {
              MenuItem: true,
            },
          },
        },
      },
    },
  });

  const orderItem = order.Order.map((item) => {
    return item.OrderItem;
  });

  //EXPLAIN params es = { name: "1"}
  const { name } = params;

  const menu = await db.menu.findUnique({
    where: {
      id: parseInt(name),
    },
    include: {
      MenuCategories: {
        include: {
          MenuItem: true,
        },
      },
    },
  });

  if (!menu) {
    throw new Response("Menu does't Exist", { status: 404 });
  }

  return { menu, orderItem };
};

//MAIN!
export default function MenuItem() {
  const { scrollYProgress } = useScroll();

  const fetcher = useFetcher();
  const errors = useActionData();

  const ref = useRef([]);
  const ref2 = useRef();

  const { menu, orderItem } = useLoaderData();
  const { MenuCategories } = menu;

  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState({
    itemInfo: false,
    cartInfo: false,
  });
  const [menuItem, setMenuItem] = useState();
  const [quantity, setQuantity] = useState(1);
  const [scroll, setScroll] = useState();
  const [selected, setSelected] = useState();
  const [orderItems] = orderItem;

  const handleScroll = (ref) => {
    // TODO Arreglar el scroll, esta acomodado manualmente, pero falta que se ponga abajo del header automaticamente

    window.scrollTo({
      top: ref.offsetTop - 110, //
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // EXPLAIN: elimina el quantity para que cada ves que el usuario se meta a pedir la orden salga siempre en 0
    if (!showModal.itemInfo) {
      setQuantity(1);
    }
  }, [showModal.itemInfo]);

  useEffect(() => {
    const sticky = document.querySelector("#sticky-header");
    console.log(sticky);
    const stick = sticky.offsetTop;
    window.addEventListener("scroll", () => {
      // console.log("scrollY", window.scrollY);
      setScroll(window.scrollY >= stick);
    });
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log(entry);
    });
    // const id = ref.current;
    // console.log("refffs", id);
    ref.current.map((a, i) => observer.observe(ref.current[i]));
  }, []);

  const handleHide = (id) => {
    setHide((e) => !e);
    if (hide) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  return (
    <>
      {/* motion.div style={{ scaleX: scrollYProgress */}
      {/* CATEGORIES */}
      {/* <MainHeader hide={true}></MainHeader> */}
      <div id="sticky-header"></div>
      <AnimatePresence>
        {scroll && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex  bg-white  space-x-2  overflow-x-scroll  whitespace-nowrap mt-2 sticky top-10 left-0 right-0 
                        items-center h-auto py-4 px-4 pt-6 pb-4"
          >
            <div>
              <BiMenuAltLeft className="h-5 w-5" />
            </div>
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
          </motion.main>
        )}
      </AnimatePresence>

      {/* MENU */}
      <section className="">
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
                onClick={() => handleHide()}
              >
                <h2 className="text-lg font-bold m-2">{categories.name}</h2>
                {hide ? (
                  <ChevronUpIcon className="h-5 w-5 m-2" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 m-2" />
                )}
              </div>
              {hide
                ? null
                : categories.MenuItem.map((item) => {
                    return (
                      <button
                        className="w-full p-2 text-left"
                        onClick={() => {
                          setShowModal({ itemInfo: true });
                          setMenuItem(item);
                        }}
                        key={item.id}
                      >
                        <div className="flex flex-row  justify-between">
                          <div className="flex flex-col space-y-1 ">
                            <h4>{item.name}</h4>
                            <p className="text-xs clip">{item.description}</p>
                            {/* <p className="text-sm">{item.specs}</p> */}
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
        {/* MODAL */}
        {showModal.itemInfo && (
          <Modal
            onClose={() => setShowModal({ itemInfo: false })}
            modalClassName={true}
          >
            <ModalContainer imgHeader={menuItem.image}>
              <Form className="flex flex-col space-y-2" method="POST">
                <div className="flex flex-row justify-between">
                  <h4 className="font-semibold text-lg">{menuItem.name}</h4>
                  <span>${menuItem.price}</span>
                </div>
                <p>{menuItem.description}</p>
                {/* <p className="text-xs">{menuItem.specs}</p> */}
                <div className="flex flex-row justify-between py-8 ">
                  {/* <label>{quantity}</label> */}
                  <div className="flex flex-row items-center space-x-4">
                    <button
                      className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
                      onClick={() =>
                        setQuantity(quantity <= 0 ? 0 : quantity - 1)
                      }
                      disabled={quantity === -1}
                    >
                      <span>-</span>
                    </button>
                    <label>{quantity}</label>
                    <button
                      className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <span>+</span>
                    </button>
                    {errors?.msg ? <p>{errors.msg}</p> : null}
                    <input type="hidden" name="price" value={menuItem.price} />
                    <input type="hidden" name="name" value={menuItem.name} />
                    <input type="hidden" name="id" value={menuItem.id} />
                    <input type="hidden" name="quantity" value={quantity} />
                  </div>
                </div>

                <button
                  className="largeButton bg-black text-white justify-center text-center"
                  name="submit"
                  type="submit"
                  value="submit"
                  // onClick={() => setShowModal(false)}
                >
                  Agregar
                </button>
              </Form>
            </ModalContainer>
          </Modal>
        )}
        {/* EXPLAIN CART INFO */}
        {showModal.cartInfo && (
          <Modal
            onClose={() => setShowModal({ cartInfo: false })}
            modalClassName={false}
          >
            <ModalContainer cName=" bg-[#FCFDFD]">
              <ModalHeader
                onClose={() => setShowModal({ cartInfo: false })}
                title="Cart"
              />
              <div className="mt-10">
                {orderItems.map((item, i) => {
                  const menuItem = item.MenuItem;
                  return (
                    <>
                      <fetcher.Form
                        method="POST"
                        key={i}
                        className="flex flex-col bg-white p-2 m-1 shadow-xl"
                      >
                        <div className="flex flex-row justify-between items-center">
                          <div className="space-x-2 flex flex-row w-fit justify-center items-center  ">
                            <div className="flex flex-row items-center space-x-2">
                              <button
                                className="h-6 w-6  ring-1 ring-gray-500  text-gray-500 rounded-full text-center flex justify-center items-center"
                                name="action"
                                value="decreaseQuantityCart"
                              >
                                -
                              </button>

                              <p className="text-center flex justify-center items-center">
                                {item.quantity}
                              </p>
                              <button
                                className="h-6 w-6   bg-black text-white rounded-full text-center flex justify-center items-center"
                                name="action"
                                value="increaseQuantityCart"
                              >
                                +
                              </button>
                            </div>

                            {/* <img src={menuItem.image} className="h-14 w-14" /> */}
                            <div className="flex flex-col">
                              <input
                                type="hidden"
                                name="cartItem"
                                value={item.id}
                              />

                              <p> {menuItem.name}</p>
                              <p className="text-sm">Extras</p>
                            </div>
                          </div>
                          <p>${item.price * item.quantity}</p>
                        </div>
                        {/* <div className="flex flex-row"></div> */}
                        <input
                          type="hidden"
                          name="menuItemId"
                          value={menuItem.id}
                        />
                      </fetcher.Form>
                    </>
                  );
                })}
              </div>
            </ModalContainer>
          </Modal>
        )}
        <button
          className="bg-black sticky text-xl mt-auto ml-auto  bottom-5 right-5 rounded-lg p-5 w-full text-white"
          onClick={() => setShowModal({ cartInfo: true })}
        >
          <p>Cart ({orderItems ? orderItems.length : 0})</p>
        </button>
      </section>
      <div ref={ref2}></div>
    </>
  );
}
