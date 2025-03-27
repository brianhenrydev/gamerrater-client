import { Link } from "react-router-dom";

const Game = ({ game }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden m-3">
      <Link to={`/games/${game.id}`} className="block">
        <div className="relative">
          <img
            src={game.image || "https://via.placeholder.com/300x200"}
            alt={game.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded-bl-lg">
            {game.recommended_age}+
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{game.title}</h3>
          <p className="text-gray-600 mb-4">{game.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">
              {game.time_to_complete_estimate}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Game;
