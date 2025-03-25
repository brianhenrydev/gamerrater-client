import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameReviews from "./GameReviews";

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState({
    title: "",
    release_year: "",
    user: { username: "" },
    description: "",
    time_to_complete_estimate: 0,
    recommended_age: 0,
  });
  const [reviews, setReviews] = useState([
    { id: 1, content: "test" },
    { id: 2, content: "test" },
    { id: 3, content: "test" },
    { id: 4, content: "test" },
  ]);

  const fetchReviews = () => {
    fetch("", {
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

  useEffect(() => {
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
  }, [gameId]);
  return (
    <div>
      <div className="m-32 mb-0 border-4 p-3 rounded-xl">
        <div>Title</div>
        <div>{game.title}</div>
        <div>Designer</div>
        <div>{game.user?.username}</div>
        <div>Description</div>
        <div>{game.description}</div>
        <div>release year</div>
        <div>{game?.release_year.split("-")[0]}</div>
        <div>playtime estimate</div>
        <div>{game.time_to_complete_estimate} min</div>
        <div>recommended age</div>
        <div>{game.recommended_age} years of life completed</div>
      </div>
      <GameReviews reviews={reviews} fetchReviews={fetchReviews} />
    </div>
  );
};

export default GameDetails;
