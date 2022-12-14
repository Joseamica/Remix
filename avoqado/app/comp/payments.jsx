import { Form, useLoaderData } from "@remix-run/react";
import { forwardRef, useEffect, useState } from "react";
import { LargeButtonMain } from "~/components";
import { TipButton } from "./button";
import { BoxContainer } from "./containers";
import { SplitTypeCustom } from "./modals-containers";
import { Modal } from "./modals";
import { OrderItemsDetail } from "./ordered-items-and-total";
import { PencilIcon } from "@heroicons/react/outline";
import { Divider } from "./divider";

export const PayFull = forwardRef(({ subtotal, userTotal }, ref) => {
  const [tip, setTip] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const typeOfAmount = subtotal ?? userTotal;

  const tipObj = {
    standard: typeOfAmount * 0.1,
    generous: typeOfAmount * 0.12,
    amazing: typeOfAmount * 0.18,
  };
  // useEffect(() => {
  //   if (subtotal) {
  //     // setType(subtotal);
  //     console.log("subtotal");
  //   } else if (userTotal) {
  //     setType(userTotal);
  //   }
  // }, [subtotal, userTotal]);

  useEffect(() => {
    setGrandTotal(typeOfAmount + tip);
  }, [tip]);

  useEffect(() => {
    setTimeout(() => {
      ref?.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  }, []);

  return (
    <>
      <BoxContainer>
        <h2 className="text-xl my-2" ref={ref}>
          Would you like to leave a tip?
        </h2>
        <div className="flex flex-row space-x-1 justify-between">
          <TipButton val="standard" onClick={() => setTip(tipObj.standard)}>
            <h3 className="text-black text-xs">Standard</h3>
            <h4 className="font-medium text-sm">
              ${tipObj.standard.toLocaleString("en-US")}
            </h4>
          </TipButton>
          <TipButton val="generous" onClick={() => setTip(tipObj.generous)}>
            <h3 className="text-black text-xs">Generous</h3>
            <h4 className="font-medium text-sm">
              ${tipObj.generous.toLocaleString("en-US")}
            </h4>
          </TipButton>

          <TipButton val="amazing" onClick={() => setTip(tipObj.amazing)}>
            <h3 className="text-black text-xs">Amazing</h3>
            <h4 className="font-medium text-sm">
              ${tipObj.amazing.toLocaleString("en-US")}
            </h4>
          </TipButton>
          <TipButton val="custom" onClick={() => setShowModal(true)}>
            <h3 className="text-black text-xs">Custom</h3>
            <h4 className="font-medium text-sm">
              {tip > 0 ? (
                `$ ${tip.toLocaleString("en-US")}`
              ) : (
                <PencilIcon className="h-5 w-5" />
              )}
            </h4>
          </TipButton>
        </div>
      </BoxContainer>
      <BoxContainer>
        <div className="">
          <div className="flex flex-row justify-between ">
            <p>Subtotal</p>
            <p>${typeOfAmount}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Tip</p>
            <p>${tip.toFixed(2)}</p>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row justify-between">
            <p className="text-2xl">Total</p>
            <p className="text-2xl">${tip ? grandTotal : typeOfAmount}</p>
          </div>
        </div>
      </BoxContainer>
      <Form method="POST">
        <input type="hidden" name="tip" value={tip} />
        <LargeButtonMain type="submit">PAY $ {grandTotal}</LargeButtonMain>
      </Form>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <Form method="POST">
          <div className="flex flex-row items-center w-full my-2 rounded-xl bg-gray-100 p-2">
            <label className="text-6xl bg-gray-100">$</label>
            <input
              type="number"
              onChange={(e) => setTip(Number(e.target.value))}
              className="flex w-full text-6xl placeholder:p-2 placeholder:text-6xl bg-transparent h-20 "
              placeholder="0.00"
            />
            <input type="hidden" name="tip" value={tip} />
          </div>
          <LargeButtonMain type="submit" onClick={() => setShowModal(false)}>
            Confirm
          </LargeButtonMain>
        </Form>
      </Modal>
    </>
  );
});

export const OnSplit = ({ userTotal, subtotal }) => {
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const { branch, table, menuId, orderedItems, orderTotal } = useLoaderData();
  return (
    <>
      <div className="bg-white shadow-lg p-3 space-y-2 rounded-2xl ">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl">Paying</h2>
          <h2 className="text-2xl">${userTotal}</h2>
        </div>
        <Divider />

        <LargeButtonMain
          onClick={() => {
            setShowModal(true), setTypeModal("EditSplit");
          }}
        >
          Edit Split
        </LargeButtonMain>
        <LargeButtonMain
          onClick={() => {
            setShowModal(true), setTypeModal("SeeOrder");
          }}
        >
          See Order
        </LargeButtonMain>
        {/* EXPLAIN aqui es donde se escoge el tip subtotal tip y total */}
        <PayFull userTotal={userTotal} />
      </div>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        {typeModal === "EditSplit" && (
          <SplitTypeCustom userTotal={userTotal} onClose={setShowModal}>
            <LargeButtonMain
              name="removeSplit"
              value="remove"
              className="bg-red-300 text-red-600 mt-2"
            >
              Remove Split
            </LargeButtonMain>
          </SplitTypeCustom>
        )}
        {typeModal === "SeeOrder" && (
          <>
            <OrderItemsDetail orderItemsOnTable={orderedItems} hideBill={true}>
              <div className="flex flex-row w-full justify-between  pt-5">
                <p>Total</p>
                <label>{subtotal}</label>
              </div>
            </OrderItemsDetail>
          </>
        )}
      </Modal>
    </>
  );
};
