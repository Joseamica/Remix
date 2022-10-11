import { useState } from "react";
import { Modal, Dish, ModalContainer } from "../../components";

import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { db } from "../../utils/db.server";

export const MenuLayout = ({ dish, props, categories, mesa, setMesa }) => {
  const [showModal, setShowModal] = useState(false);
  const [dishInfo, setDishInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleRemoveQuantity = () => {
    if (quantity === 1) {
      return false;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const handleOrder = (e) => {
    // TODO: almacenar esto en localstorage
    setMesa((prevState) => [...prevState, { quantity, dishInfo }]);
    setQuantity(1);
    setShowModal(false);
  };

  return (
    <>
      {/* {categories.map((categorie) => {
        return (
          <button key={categorie.id} className="flex flex-row justify-between">
            <h2>{categorie.name}</h2>
            <div>
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          
          </button>
        );
      })} */}
      <div className="bg-white rounded-2xl shadow-md divide-y-2 space-y-1">
        {dish.map((dish) => {
          return (
            <div key={dish.id}>
              {/* <div>{dish.comments}</div> */}
              <Dish
                onClick={() => {
                  setShowModal(true);
                  setDishInfo(dish);
                }}
                props={props}
                dish={dish}
                name={dish.name}
                image={dish.image}
                specs={dish.specs}
                description={dish.description}
                price={dish.price}
                comments={dish.comments}
              />
            </div>
          );
        })}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} modalClassName={true}>
            <ModalContainer imgHeader={dishInfo.image}>
              {/* <ModalHeader onClose={() => setShowModal(false)} /> */}

              <div className="flex flex-col space-y-2">
                <Form method="post">
                  <label>a</label>
                  <input
                    className="ring-1 w-5"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="5"
                  />
                  <button type="submit">submit</button>
                </Form>
                <div className="flex flex-row justify-between">
                  <h4 className="font-semibold text-lg">{dishInfo.name}</h4>
                  <span>${dishInfo.price}</span>
                </div>
                <p>{dishInfo.description}</p>
                <p className="text-xs">{dishInfo.specs}</p>
                <div className="flex flex-row justify-between py-8 ">
                  <label>quantity</label>
                  <div className="flex flex-row items-center space-x-4">
                    <button
                      onClick={handleRemoveQuantity}
                      className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
                    >
                      <span>-</span>
                    </button>
                    <label>{quantity}</label>
                    <button
                      onClick={handleAddQuantity}
                      className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>

                {/* <Link
                  to={`/menu/${dishInfo.id}`}
                  className="largeButton bg-black text-white justify-center text-center"
                >
                  Agregar
                </Link> */}
                <button
                  className="largeButton bg-black text-white justify-center text-center"
                  onClick={handleOrder}
                >
                  Agregar
                </button>
              </div>
            </ModalContainer>
          </Modal>
        )}
        {/* como hacer el post? por medio de formulario */}
      </div>
    </>
  );
};
