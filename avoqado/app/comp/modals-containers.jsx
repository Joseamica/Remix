import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LargeButtonMain } from "~/components";
import { Modal } from "./modals";

export const MenuItemDetailMC = ({ menuItem, setQuantity, quantity }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row justify-between">
        <h4 className="font-semibold text-lg">{menuItem.name}</h4>
        <span>${menuItem.price}</span>
      </div>
      <p>{menuItem.description}</p>
      {/* <p className="text-xs">{menuItem.specs}</p> */}
      <div className="flex flex-row justify-between py-2 ">
        {/* <label>{quantity}</label> */}
        <div className="flex flex-row items-center space-x-4">
          <button
            className="h-8 w-8 ring-1 ring-gray-400  rounded-full"
            onClick={() => setQuantity(quantity <= 0 ? 0 : quantity - 1)}
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
        </div>
      </div>
      {quantity === 0 ? (
        <p className="text-xs text-redMainColor">
          Agrega mas de 1 platillo o mas
        </p>
      ) : null}

      <Form method="POST">
        <LargeButtonMain
          className="largeButton bg-black text-white justify-center text-center"
          name="submit"
          type="submit"
          value="submit"
          // onClick={() => setShowModal(false)}
        >
          Add
        </LargeButtonMain>
        <input type="hidden" name="price" value={menuItem.price} />
        <input type="hidden" name="name" value={menuItem.name} />
        <input type="hidden" name="id" value={menuItem.id} />
        <input type="hidden" name="quantity" value={quantity} />
      </Form>
    </div>
  );
};

export const CartItemsDetailMC = ({ orderItem }) => {
  return (
    <div className="">
      {orderItem.map((item, i) => {
        const menuItem = item.MenuItem;
        return (
          <div key={item.id}>
            <Form
              method="POST"
              key={item.id}
              className="flex flex-col bg-white p-3 m-1 drop-shadow-xl rounded-xl"
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

                  <div className="flex flex-col">
                    <input type="hidden" name="cartItem" value={item.id} />

                    <p> {menuItem.name}</p>
                    <p className="text-sm">Extras</p>
                  </div>
                </div>
                <p>${item.price * item.quantity}</p>
              </div>

              <input type="hidden" name="menuItemId" value={menuItem.id} />
              <input type="hidden" name="cartItem" value={item.id} />
              <input type="hidden" name="cartQuantity" value={item.quantity} />
            </Form>
          </div>
        );
      })}
      <LargeButtonMain>hola</LargeButtonMain>
    </div>
  );
};

export function SplitBillMC({
  showModal,
  setShowModal,
  showAnotherModal,
  setShowAnotherModal,
  splitType,
  setSplitType,
  setShowExtraModal,
}) {
  const handleAnotherModal = (value) => {
    setShowAnotherModal(true);
    setShowModal(false);
    setSplitType(value);
  };

  return (
    <>
      <div className="space-y-2">
        <LargeButtonMain onClick={() => handleAnotherModal("perArticle")}>
          <p>Pay per article</p>
        </LargeButtonMain>
        <LargeButtonMain onClick={() => handleAnotherModal("equalParts")}>
          <p>Split in equal parts</p>
        </LargeButtonMain>
        <LargeButtonMain onClick={() => setShowExtraModal(true)}>
          <p>Pay a custom amount</p>
        </LargeButtonMain>
      </div>
    </>
  );
}

export function SplitTypePerArticle({ orderItemsOnTable }) {
  return (
    <div>
      {orderItemsOnTable.map((item, i) => {
        const menuItem = item.MenuItem;
        return (
          <div key={item.id}>
            <Form
              method="POST"
              key={item.id}
              className="flex flex-col bg-white p-3 m-1 drop-shadow-xl rounded-xl"
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

                  <div className="flex flex-col">
                    <input type="hidden" name="cartItem" value={item.id} />

                    <p> {menuItem.name}</p>
                    <p className="text-sm">Extras</p>
                  </div>
                </div>
                <p>${item.price * item.quantity}</p>
              </div>

              <input type="hidden" name="menuItemId" value={menuItem.id} />
              <input type="hidden" name="cartItem" value={item.id} />
              <input type="hidden" name="cartQuantity" value={item.quantity} />
            </Form>
          </div>
        );
      })}
    </div>
  );
}

export function SplitTypeEqualParts() {
  return (
    <div>
      <p>SplitTypeEqualParts</p>
    </div>
  );
}

export function SplitTypeCustom({
  setShowExtraModal,
  subtotal,
  amountToPay,
  setAmountToPay,
  setSubmitType,
  userTotal,
  onClose,
  children,
}) {
  const [amount, setAmount] = useState(0);

  // useEffect(() => {
  //   aseZ

  // }, [third])

  return (
    <Form method="POST">
      <div className="flex flex-row items-center w-full my-2 rounded-xl bg-gray-100 p-2">
        <label className="text-6xl bg-gray-100">$</label>
        <input
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex w-full text-6xl placeholder:p-2 placeholder:text-6xl bg-transparent h-20 "
          defaultValue={userTotal ? userTotal : null}
          placeholder="0.00"
        />
        <input type="hidden" name="amountToPay" value={amount} />
      </div>
      {/* <p>amount to pay{amount}</p> */}
      <LargeButtonMain type="submit" onClick={() => onClose(false)}>
        Confirm
      </LargeButtonMain>
      {children}
    </Form>
  );
}
