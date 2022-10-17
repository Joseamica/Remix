import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useParams } from "@remix-run/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoriesMenuButton, Modal, MenuLayout } from "~/components/";
import { db } from "~/utils/db.server";
import { ModalContainer } from "../../components";
import { getSession, commitSession } from "../../sessions";

export const loader = async ({ params, request }) => {
  const url = new URL(request.url);
  const restId = parseInt(url.searchParams.get("rest"));
  const branchId = parseInt(url.searchParams.get("branch"));
  const meal = url.searchParams.get("meal");
  const tableId = parseInt(url.searchParams.get("table"));

  const allMenu = await db.menu.findMany({});

  if (!restId && !branchId && !meal) {
    return redirect("/");
    // return { allMenu };
  }

  const menu = await db.menu.findFirst({
    where: {
      name: meal,
      branchId: branchId,
      branch: {
        restaurantId: restId,
      },
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
    throw new Error("Menu not founded", { status: 404 });
  }

  return redirect(`/menu/${menu.id}/?table=${tableId}`);
};

//FUNCION
const Menu = (props) => {
  const { allMenu } = useLoaderData();
  return (
    <main className="col-start-1 col-end-13 space-y-2 tracking-normal"></main>
  );
};

export default Menu;
