import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Modal, ModalContainer } from "../../components";
import { db } from "../../utils/db.server";

export const loader = async ({ request, params }) => {
  const mealTime = {
    BREAKFAST: 7,
    LUNCH: 12,
    DINNER: 18,
    CLOSE: 22,
  };
  const date = new Date();
  const hour_of_the_day = date.getHours();

  //TODO get what the user chooses to be their hours
  //TEMPORAL

  if (
    hour_of_the_day >= mealTime.BREAKFAST &&
    hour_of_the_day <= mealTime.LUNCH
  ) {
    return redirect(`/menu/breakfast`);
  } else if (
    hour_of_the_day >= mealTime.LUNCH &&
    hour_of_the_day <= mealTime.DINNER
  ) {
    return redirect(`/menu/lunch`);
  } else if (
    hour_of_the_day >= mealTime.DINNER &&
    hour_of_the_day <= mealTime.CLOSE
  ) {
    return redirect(`/menu/dinner`);
  }

  const meal = await db.menu.findMany({
    where: {
      name: params.name,
      // Modificar el 1
      branchId: params.id,
    },
    include: {
      MenuCategories: {
        where: {
          id: params.id,
        },
        include: {
          MenuItem: true,
        },
      },
    },
  });
  const varBreakfast = meal[0];
  const menuCategories = await db.menuCategories.findMany({
    where: {
      menuId: varBreakfast.id,
    },
  });
  const allMenuItems = await db.menuItem.findMany({
    where: {
      menuCategoriesId: 1,
    },
  });

  return { meal, menuCategories };
};

const Menu = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [hour, setHour] = useState("");

  // useEffect(() => {
  //   asignHour();
  // }, []);

  const { meal } = useLoaderData();

  return (
    <main className="col-start-1 col-end-13 space-y-2 tracking-normal">
      <section className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Menu</h1>
        {/* <button onClick={() => scrollToRef.current.scrollIntoView()}>
            scroll
          </button> */}
      </section>
      {/* TODO: Scrolling horizontal */}

      <section className="bg-white shadow-md rounded-md py-2 flex space-x-2 overflow-x-scroll scroll whitespace-nowrap">
        {/* <CategoriesMenuButton
            title={"All"}
            onClick={() => setFilteredDish(dish)}
          /> */}
        {/* {categories.map((category) => {
            return (
              <CategoriesMenuButton
                key={category.id}
                title={category.name}
                onClick={() => handleCategories(category.id)}
              />
            );
          })} */}
      </section>
      <section className="">
        {/* <MenuLayout
            dish={filteredDish}
            props={props}
            categories={categories}
            mesa={mesa}
            setMesa={setMesa}
          /> */}

        {/* <div ref={scrollToRef}>hola</div> */}
      </section>

      <button
        className="bg-black sticky text-xl mt-auto ml-auto  bottom-5 right-5 rounded-lg p-5 w-full text-white"
        onClick={() => setShowModal(true)}
      >
        {/* TODO: hacer que cuente cuantas ordenes hay */}
        {/* <a>Cart ({mesa.length})</a> */}
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} modalClassName={true}>
          <ModalContainer>
            Order
            {/* {mesa.map((m) => {
              return (
                <div key={m.dishInfo.id}>
                  <div className="flex flex-row">
                    <p>{m.quantity}</p>
                    <p>{m.dishInfo.name}</p>
                  </div>
                </div>
              );
            })} */}
          </ModalContainer>
        </Modal>
      )}
    </main>
  );
};

export default Menu;
