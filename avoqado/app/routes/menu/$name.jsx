import { redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
} from "@heroicons/react/outline";

import { db } from "../../utils/db.server";
import { Modal, ModalContainer } from "../../components";

//ACTION!
export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const id = parseInt(formData.get("id"));

  // EXPLAIN get quantity value
  const quantity = formData.get("quantity");
  const name = formData.get("name");
  const price = parseInt(formData.get("price"));
  const total = price * quantity;

  // if (submit === "submit") {
  // await db.orderItem.create({
  //   data: {
  //     price: price,
  //     quantity: parseInt(quantity),
  //     MenuItem: {
  //       connect: {
  //         id: id,
  //       },
  //     },
  //   },
  // });
  // }

  switch (quantity) {
    case "increaseQuantity":
      const q = quantity + 1;
      console.log("quantity", q);
      break;
    case "decreaseQuantity":
      console.log("decreased!!");
  }

  return true;
};

//HEADER CHANGES useMatch()
export const handle = {
  changeHeader: true,
};

//LOADER
export const loader = async ({ params, request }) => {
  // params es = { name: "1"}
  const { name } = params;

  const menu = await db.menu.findFirst({
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

  return { menu };
};

export default function MenuItem() {
  const fetcher = useFetcher();

  const ref = useRef([]);

  const { menu } = useLoaderData();
  const { MenuCategories } = menu;
  const [hide, setHide] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuItem, setMenuItem] = useState();
  const [quantity, setQuantity] = useState(0);

  const handleScroll = (ref) => {
    // TODO Arreglar el scroll, esta acomodado manualmente, pero falta que se ponga abajo del header automaticamente
    // console.log(ref);
    // ref.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
    window.scrollTo({
      top: ref.offsetTop - 100,
      behavior: "smooth",
    });
    console.log(ref);
  };

  // useEffect(() => {
  //   ref.current.map((a) =>
  //     a.scrollIntoView({
  //       top: 0,
  //       behavior: "smooth",
  //     })
  //   );
  // }, [scroll]);
  useEffect(() => {
    // EXPLAIN: elimina el quantity para que cada ves que el usuario se meta a pedir la orden salga siempre en 0
    if (showModal) {
      setQuantity(0);
    }
  }, [showModal]);

  const handleHide = (id) => {
    setHide((e) => !e);
    if (hide) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  const handleAddQuantity = () => {};

  return (
    // TODO: Filtrar
    <>
      {/* CATEGORIES */}
      <div className="col-start-1 col-end-13 flex  bg-white  space-x-2  overflow-x-scroll scroll whitespace-nowrap  items-center h-auto py-4 px-4    fixed top-12 left-0 right-0">
        <div>
          <FilterIcon className="h-5 w-5" />
        </div>
        {MenuCategories.map((categories, index) => {
          return (
            <div
              className="rounded-full hover:scale-105 ease-in-out duration-300 px-1"
              key={categories.id}
              // click y te lleva al scrollposition
              onClick={() => handleScroll(ref.current[index])}
            >
              {categories.name}
            </div>
          );
        })}
      </div>
      {/* MENU */}
      <div className="col-start-1 col-end-13  ">
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
                          setShowModal(true);
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
                            <img
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
        {showModal ? (
          <Modal onClose={() => setShowModal(false)} modalClassName={true}>
            <ModalContainer imgHeader={menuItem.image}>
              <fetcher.Form className="flex flex-col space-y-2" method="post">
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
                      name="quantity"
                      value="decreaseQuantity"
                      className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
                      // onClick={() =>
                      //   setQuantity(quantity <= 0 ? 0 : quantity - 1)
                      // }
                      disabled={quantity === 0}
                    >
                      <span>-</span>
                    </button>
                    <label>{quantity}</label>
                    <button
                      name="quantity"
                      value="increaseQuantity"
                      className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
                      // onClick={() => setQuantity(quantity + 1)}
                    >
                      <span>+</span>
                    </button>
                    <input type="hidden" name="price" value={menuItem.price} />
                    <input type="hidden" name="name" value={menuItem.name} />
                    <input type="hidden" name="id" value={menuItem.id} />
                  </div>
                </div>

                {/* <Link
               to={`/menu/${menuItem.id}`}
               className="largeButton bg-black text-white justify-center text-center"
             >
               Agregar
             </Link> */}

                <button
                  className="largeButton bg-black text-white justify-center text-center"
                  type="submit"

                  // onClick={() => setShowModal(false)}
                >
                  Agregar
                </button>
              </fetcher.Form>
            </ModalContainer>
          </Modal>
        ) : null}
      </div>
    </>
  );
}
