import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GameReview = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [gameReview, setGameReview] = useState({
    game: parseInt(gameId),
    content: "",
  });
  const handleReview = () => {
    if (!gameReview.game || !gameReview.content) {
      window.alert("Could not save");
    }
    if (gameReview.game && gameReview.content) {
      console.log("hi");
      navigate(`/games/${gameId}`);
    }
  };

  return (
    <div className="flex flex-col m-6 border-4 p-2 rounded-lg">
      <div>Write a review for this game</div>
      <textarea
        onChange={({ target: { value: textContent } }) => {
          setGameReview((prev) => ({
            ...prev,
            content: textContent,
          }));
        }}
        className="bg-blue-300 rounded-sm"
      />
      <button className="border rounded-lg m-2" onClick={handleReview}>
        Save
      </button>
    </div>
  );
};

export default GameReview;
