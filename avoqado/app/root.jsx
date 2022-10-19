import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import { Grid } from "./components/grid/Grid";
import { MainHeader } from "./components/ui/Header/MainHeader";

import styles from "./styles/tailwind.css";

export const meta = () => ({
  charset: "utf-8",
  title: "avoqado",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function Layout() {
  let matches = useMatches();
  let match = matches.find(
    (match) => match.handle && match.handle.changeHeader
  );

  return (
    <main className="">
      <MainHeader
        changeHeader={match ? match.handle.changeHeader : null}
        hide={true}
      />
      {/* <Grid> */}
      <div className="px-4">
        <Outlet />
      </div>
      {/* </Grid> */}
    </main>
  );
}

export default function App({ children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className=" ">
        <Layout />

        <div id="modal-root" />
        {/* Scroll restoration hace que si quieres reload se quede en la misma posicion */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="">
        <MainHeader hide={false} />

        <div className="flex flex-col p-2">
          <h1 className="text-2xl">Error</h1>
          <p>{error.message}</p>
          {/* //TODO poner que regrese un link atras */}
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5
            py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white
             dark:border-gray-600 dark:hover:bg-gray-700
              dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
