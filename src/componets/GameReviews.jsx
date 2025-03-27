import { useParams } from "react-router-dom";
import GameReview from "./form/GameReview";
import { useEffect, useState } from "react";

const GameReviews = ({ reviews, fetchReviews, fetchGames, averageRating }) => {
  const { gameId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [gameReview, setGameReview] = useState({
    game: parseInt(gameId),
    content: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    setIsModalOpen(false);
    setGameReview((prev) => ({
      ...prev,
      content: "",
    }));
    fetch(`http://localhost:8000/game-reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
      body: JSON.stringify(gameReview),
    }).then(() => {
      fetchReviews();
    });
  };
  const handleRating = () => {
    fetch(`http://localhost:8000/game-ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
      body: JSON.stringify({ rating: rating, game: gameId }),
    }).then(() => {
      fetchGames();
    });
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden m-3">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <select
                onChange={({ target: { value: rating } }) => {
                  setRating(parseInt(rating));
                }}
                className="border rounded-sm p-1 mr-2"
              >
                <option value="0"> Rate game</option>
                <option value="1"> 1 star</option>
                <option value="2"> 2 stars</option>
                <option value="3"> 3 stars</option>
                <option value="4"> 4 stars</option>
                <option value="5"> 5 stars</option>
                <option value="6"> 6 stars</option>
                <option value="7"> 7 stars</option>
                <option value="8"> 8 stars</option>
                <option value="9"> 9 stars</option>
                <option value="10"> 10 stars</option>
              </select>
              <button
                onClick={handleRating}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Review game
            </button>
          </div>
          <div className="text-lg font-medium mb-4">Reviews</div>
          {reviews.map((r) => (
            <div key={r.id} className="bg-gray-100 rounded-lg p-4 mb-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">{r.user?.username}</div>
                <div>{r.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <GameReview
          handleReviewSubmit={handleReviewSubmit}
          setIsModalOpen={setIsModalOpen}
          setGameReview={setGameReview}
        />
      )}
    </div>
  );
};

export default GameReviews;
