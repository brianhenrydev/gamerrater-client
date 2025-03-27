import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameReviews from "./GameReviews";

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({
    title: "",
    release_year: "",
    user: { username: "" },
    description: "",
    time_to_complete_estimate: 0,
    recommended_age: 0,
  });
  const [reviews, setReviews] = useState([
    { id: 1, content: "reviews loading..." },
  ]);
  console.log(game);

  const fetchReviews = () => {
    fetch(`http://localhost:8000/game-reviews?game_id=${gameId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((reviews) => {
        setReviews(reviews.reverse());
      });
  };

  const fetchGames = () => {
    fetch(`http://localhost:8000/games/${gameId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((game) => {
        setGame(game);
      });
  };
  useEffect(() => {
    fetchGames();
  }, [gameId]);
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden m-3 flex">
        <div className="w-1/2 relative">
          <img
            src={game.image || "https://via.placeholder.com/300x200"}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 bg-gray-800 text-white px-2 py-1 rounded-bl-lg">
            {game.recommended_age}+
          </div>
        </div>
        <div className="p-4 w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium mb-2">{game.title}</h3>
            <p className="text-gray-600 mb-4">Designer: {game.designer}</p>
            <p className="text-gray-600 mb-4">
              Owner: {game.user.first_name} {game.user.last_name} (@
              {game.user.username})
            </p>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">
                Release Year: {game.release_year.split("-")[0]}
              </span>
              <span className="text-gray-500">
                Playtime: {game.time_to_complete_estimate} min
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">
                Average Rating: {game.average_rating}
              </span>
              <span className="text-gray-500">
                Categories: {game.categories.join(", ")}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {game.is_owner && (
              <div>
                <button
                  onClick={() => {
                    navigate(`/games/${game.id}/edit`);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
              </div>
            )}
            <div>
              <button
                onClick={() => {
                  navigate(`/new-post`);
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload Action Picture
              </button>
            </div>
          </div>
        </div>
      </div>
      <GameReviews
        fetchGames={fetchGames}
        averageRating={game.average_rating}
        reviews={reviews}
        fetchReviews={fetchReviews}
      />
    </div>
  );
};

export default GameDetails;
