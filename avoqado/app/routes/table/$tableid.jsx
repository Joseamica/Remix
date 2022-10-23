import { BookOpenIcon } from "@heroicons/react/outline";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams, useCatch } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  Bill,
  DishLayout,
  LargeButtonWithIcon,
  RestInfo,
} from "../../components";
import { db } from "../../utils/db.server";

//1 Detecta QR http://localhost:3000/table/1

export const action = async ({ request }) => {
  //Todo: hacer una evaluacion que si la mesa existe entonces crear una nueva orden con la table id
};

export const loader = async ({ params }) => {
  const restaurant = await db.restaurant.findMany();
  const tableCount = await db.table.count({});
  const table = await db.table.findMany({
    where: {
      id: parseInt(params.tableid),
    },
  });
  const dishOrder = await db.dish.findMany({
    where: {
      orders: {
        some: {
          id: 1,
        },
      },
    },
  });

  //Cuantas fields de tables existes
  if (tableCount < params.tableid) {
    throw new Error(`La mesa ${params.tableid} no existe.`);
    //TODO MODFIICAR aqui pusimos temporalmente diners (0,1) como si fuera (true o false) para no modificar la base de datos, pero hicimos una validacion que si tiene diners = 1 es que ya tiene una oprden activa
  } else if (table[0].order === false) {
    await db.table.update({
      data: {
        // TODO: MODIFY diners
        order: true,
      },
      where: {
        id: parseInt(params.tableid),
      },
    });
    await db.order.create({
      data: {
        comments: "true",
        // table: {
        Table: {
          connect: {
            id: parseInt(params.tableid),
          },
        },

        // }
      },
    });
  }
  const orderId = await db.order.findUnique({
    where: {
      id: 26,
    },
  });

  return { params, table, restaurant, dishOrder };
};

const TableId = () => {
  const [totalBill, setTotalBill] = useState(0);
  const [mesa, setMesa] = useState({
    id: 2,
    orden: {
      hamburguesa: 2,
      toast: 2,
    },
    total: 0,
  });
  const { params, table, restaurant, dishOrder } = useLoaderData();

  const getTotal = () => {
    const totalBill = dishOrder.reduce((sum, currentValue) => {
      return sum + currentValue.price;
    }, 0);
    setTotalBill(totalBill);
  };

  useEffect(() => {
    getTotal();
  }, [dishOrder]);

  //el numero de mesa
  const tableNumber = table[0].tableNum;

  return (
    <>
      <section
        style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
        className="col-start-1 col-end-13 space-y-1"
      >
        <RestInfo restaurant={restaurant} />
        <LargeButtonWithIcon
          title={"View the menu"}
          icon={<BookOpenIcon className="h-5 w-5" />}
        />
      </section>
      <section className="col-start-1 col-end-13">
        <h4 className="text-lg">Table {tableNumber}</h4>
        {dishOrder.map((o) => {
          return (
            <DishLayout
              mesa={mesa}
              setMesa={setMesa}
              description={o.description}
              image={o.image}
              meal={o.meal}
              name={o.name}
              price={o.price}
              specs
              key={o.id}
            />
          );
        })}
        <Bill totalBill={totalBill} mesa={mesa} setMesa={setMesa} />
      </section>
    </>
  );
};

export default TableId;

export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>Rastrea el error:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Noaaaaa</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
