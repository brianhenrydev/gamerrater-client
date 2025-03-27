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
      <div className="m-32 mb-0 border-4 p-3 rounded-xl">
        <div>Title</div>
        <div>{game.title}</div>
        <div>Designer</div>
        <div>{game.designer}</div>
        <div>Description</div>
        <div>{game.description}</div>
        <div>release year</div>
        <div>{game?.release_year.split("-")[0]}</div>
        <div>playtime estimate</div>
        <div>{game.time_to_complete_estimate} min</div>
        <div>recommended age</div>
        <div>{game.recommended_age} years of life completed</div>
        <div className="flex justify-between">
          {game.is_owner ? (
            <div>
              <button
                onClick={() => {
                  navigate(`/games/${gameId}/edit`);
                }}
                className="border px-2  rounded-xl"
              >
                edit
              </button>{" "}
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <button
              onClick={() => {
                navigate(`/new-post`);
              }}
              className="border px-2  rounded-md"
            >
              Upload Action Picture
            </button>
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
