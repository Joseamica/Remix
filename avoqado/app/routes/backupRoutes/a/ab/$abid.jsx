import { Link, useOutletContext, useParams } from "@remix-run/react";

export default function TeamDetail() {
  const [ab] = useOutletContext();
  const { abid } = useParams();

  const team = ab[parseInt(abid) - 1];

  return (
    <div className="bg-purple-300">
      <p>(3)</p>
      <h2>{team.name}</h2>
      <div className="p-3 ">
        {/* {team?.players?.map((p) => (
          <div key={p.id}>
            <Link to={`/a/ab/${abid}/rest/${p.id}`}>{p.name}</Link>
          </div>
        ))} */}
      </div>

      <div>
        <Link to="/a/ab">
          <button>BACK</button>
        </Link>
      </div>
    </div>
  );
}
