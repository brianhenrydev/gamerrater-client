import { Link } from "react-router-dom";

const Game = ({ game }) => {
  return (
    <div className="border-4 bg-gray-300 rounded-2xl  m-3 p-2">
      <Link to={`/games/${game.id}`}>
        <div>
          {" "}
          <span>Title: </span>
          {game.title}
        </div>
        <div>
          <span>Description: </span>
          <p> {game.description}</p>
        </div>
        <div>
          <span>Recommended Age: </span> {game.recommended_age}
        </div>
        <div>
          <span>Play time estimate: </span>
          {game.time_to_complete_estimate}
        </div>
      </Link>
    </div>
  );
};

export default Game;
