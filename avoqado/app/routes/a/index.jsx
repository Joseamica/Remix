import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/a/ab");
};

export default function Index() {
  return <div></div>;
}
