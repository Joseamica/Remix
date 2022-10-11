import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { BookOpenIcon } from "@heroicons/react/outline";
import { getBranch, getRestaurant } from "../models/restaurant.server";

import { db } from "~/utils/db.server";

import {
  Bill,
  RestInfo,
  LargeButtonWithIcon,
  Modal,
  ModalContainer,
} from "../components/";

// LOADER
export const loader = async () => {
  const restaurant = await getRestaurant({});
  const branch = await getBranch({});

  // const menu = await db.menu.findMany();
  // const restaurant = await db.restaurant.findMany();
  // const table = await db.table.findMany();

  const dishOrder = await db.menuItem.findMany({});

  return { restaurant, branch, dishOrder };
};

// FUNCION
export default function Index(props) {
  const { menu, restaurant, branch, dishOrder } = useLoaderData();
  const [showModal, setShowModal] = useState({ state: false });
  const [totalBill, setTotalBill] = useState(0);

  const REST_INFO = branch[0];
  const REST_LOGO = restaurant[0].logo;

  const getTotal = () => {
    const totalBill = dishOrder.reduce((sum, currentValue) => {
      return sum + currentValue.price;
    }, 0);
    setTotalBill(totalBill);
  };

  useEffect(() => {
    getTotal();
  }, [dishOrder]);

  return (
    <>
      <section
        style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
        className="col-start-1 col-end-13 space-y-1"
      >
        <button
          className="w-full"
          onClick={() => setShowModal({ state: true })}
        >
          <RestInfo branch={branch} logo={REST_LOGO} />
        </button>
        <LargeButtonWithIcon
          title={"View the menu"}
          icon={<BookOpenIcon className="h-5 w-5" />}
        />
      </section>
      <section className="col-start-1 col-end-13">
        <h4 className="text-center">Table 77</h4>
        {/* TODO: All selected items at the table */}
        <Bill order={dishOrder} totalBill={totalBill} />
      </section>
      <section>
        {showModal.state && (
          <Modal onClose={() => setShowModal({ state: false })}>
            <ModalContainer
              imgHeader={REST_INFO.ppt_image}
              closeButton={true}
              setShowModal={setShowModal}
            >
              <div>{REST_INFO.name}</div>
              <div>{REST_INFO.phone}</div>
            </ModalContainer>
          </Modal>
        )}
      </section>
    </>
  );
}
