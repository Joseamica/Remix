import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoriesMenuButton, Modal, MenuLayout } from "~/components/";
import { db } from "~/utils/db.server";
import { ModalContainer } from "../../components";
import { getSession, commitSession } from "../../sessions";

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const random = form.get("title");
  // const order = await db.order.create({
  const data = await request.formData();
  const test = await data.get("quantity");
  const addOrder = await db.order.create({});

  // return redirect(`/menu/${random}`);
};

export const loader = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/");
  }

  const data = { error: session.get("error") };
  // const getHour = () => {
  //   const timezone = new Date();

  //   if (timezone.getHours() >= 7 && timezone.getHours() <= 12) {
  //     return "desayuno";
  //   } else if (timezone.getHours() >= 12 && timezone.getHours() <= 13) {
  //     return "brunch";
  //   } else if (timezone.getHours() >= 13 && timezone.getHours() <= 18) {
  //     return "comida";
  //   } else if (timezone.getHours() >= 18 && timezone.getHours() <= 24) {
  //     return "cena";
  //   }
  // };

  const categories = await db.categories.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const menu = await db.menu.findFirst();

  //NOTA: Saca el dish por orden ascendente del id de categoria
  const menu_item = await db.menu.findMany({
    orderBy: {
      categoriesId: "asc",
    },
  });

  const categoriesAll = await db.categories.findMany({});

  const dishes = await db.dish.findMany({
    where: {
      Categories: {
        is: {
          // TODO: PREGUNTAR como pasar un state de react aqui
          name: "Frutas",
        },
      },
    },
  });

  return { dish, params, categories, dishes, categoriesAll };
};

//FUNCION
const Menu = (props) => {
  const [mesa, setMesa] = useState([]);
  const [orden, setOrden] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { dish, categories, dishes, categoriesAll } = useLoaderData();
  const [category, setCategory] = useState();
  const [filteredDish, setFilteredDish] = useState(dish);

  const scrollToRef = useRef();

  const handleCategories = (event) => {
    console.log("Asignando categoria: ", event);
    setCategory(event);
  };

  const handleFilter = () => {
    if (category) {
      const filter = categories
        .filter((item) => item.id === category)
        .map((a) => a.id);
      //filter dish
      const dishFilter = dish.filter((item) => item.categoriesId === filter[0]);
      setFilteredDish(dishFilter);
    }
  };

  useEffect(() => {
    //Filter the category id
    console.log("useEffect");
    handleFilter();
  }, [category]);

  return (
    <main className="col-start-1 col-end-13 space-y-2 tracking-normal">
      <section className="flex flex-row justify-between">
        <h1 className="font-bold text-2xl">Menu</h1>
        <button onClick={() => scrollToRef.current.scrollIntoView()}>
          scroll
        </button>
      </section>
      {/* TODO: Scrolling horizontal */}

      <section className="bg-white shadow-md rounded-md py-2 flex space-x-2 overflow-x-scroll scroll whitespace-nowrap">
        <CategoriesMenuButton
          title={"All"}
          onClick={() => setFilteredDish(dish)}
        />
        {categories.map((category) => {
          return (
            <CategoriesMenuButton
              key={category.id}
              title={category.name}
              onClick={() => handleCategories(category.id)}
            />
          );
        })}
      </section>
      <section className="">
        {/* <Form method="post">
          <label htmlFor="title">AAA</label>
          <input name="title" type="text" id="title" />

          <button type="submit">aaa</button>
        </Form> */}
        <MenuLayout
          dish={filteredDish}
          props={props}
          categories={categories}
          mesa={mesa}
          setMesa={setMesa}
        />

        <div ref={scrollToRef}>hola</div>
      </section>

      <button
        className="bg-black sticky text-xl mt-auto ml-auto  bottom-5 right-5 rounded-lg p-5 w-full text-white"
        onClick={() => setShowModal(true)}
      >
        {/* TODO: hacer que cuente cuantas ordenes hay */}
        <a>Cart ({mesa.length})</a>
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} modalClassName={true}>
          <ModalContainer>
            Order
            {mesa.map((m) => {
              return (
                <div key={m.dishInfo.id}>
                  <div className="flex flex-row">
                    <p>{m.quantity}</p>
                    <p>{m.dishInfo.name}</p>
                  </div>
                </div>
              );
            })}
          </ModalContainer>
        </Modal>
      )}
    </main>
  );
};

export default Menu;
