import { Link, useOutletContext } from "@remix-run/react";

export default function AbIndex() {
  const [ab] = useOutletContext();

  return (
    <div className="bg-lime-300">
      <p>(2)</p>
      <p>TEST</p>
      {ab.map((t) => (
        <div key={t.id}>
          <Link prefetch="render" to={`/a/ab/${t.id}`}>
            {t.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
