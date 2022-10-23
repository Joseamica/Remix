import { Link, useOutletContext, useParams } from "@remix-run/react";

export default function PlayerDetail() {
  const [ab] = useOutletContext();
  const { abid, branchId } = useParams();

  const team = ab[parseInt(abid) - 1];
  const player = team.players[parseInt(branchId) - 1];

  return (
    <div className="bg-green-200">
      <p>PLAYER DETAILS</p>
      <h2>{team.name}</h2>
      <h2>{player.name}</h2>
      <div style={{ padding: 8 }}>
        <Link to={`/a/ab/${branchId}`}>
          <button>BACK</button>
        </Link>
      </div>
    </div>
  );
}
