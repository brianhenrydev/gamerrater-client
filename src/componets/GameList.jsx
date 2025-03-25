import { useEffect } from "react";
import Game from "./Game";
import { Link } from "react-router-dom";

const GameList = ({ games, fetchGames }) => {
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <div className="m-2 flex justify-between items-center">
        <h1>Games</h1>
        <div className="float-right">
          <button
            className="border rounded-lg p-2 bg-orange-500 text-white"
            type="button"
          >
            <Link to={"/create"}>Register new game</Link>
          </button>
        </div>
      </div>
      <div>
        {games.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
