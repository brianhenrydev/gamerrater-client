import { Link, useParams } from "react-router-dom";
const GameReviews = ({ reviews, fetchReviews }) => {
  const { gameId } = useParams();
  return (
    <div className="m-32 mt-3 border-2 p-3 rounded-xl">
      <div className="flex justify-end">
        <div>
          <button className="border float-right rounded-lg p-2" type="button">
            <Link to={`/games/${gameId}/review`}>Review game</Link>
          </button>
        </div>
      </div>
      <div>Reviews</div>
      {reviews.map((r) => (
        <div key={r.id} className="border-2 rounded-lg m-1 p-1">
          <div>{r.content}</div>
        </div>
      ))}
    </div>
  );
};

export default GameReviews;
