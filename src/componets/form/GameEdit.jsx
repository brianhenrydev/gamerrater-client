import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CategoryRadioSet from "../select/CategoryRadioSet";

const GameEditForm = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [err, setErr] = useState(false);
  const [updatedGame, setUpdatedGame] = useState({
    title: "",
    description: "",
    categories: [],
    designer: "",
    release_year: "",
    time_to_complete_estimate: "",
    recommended_age: "",
  });
  const userToken = JSON.parse(localStorage.getItem("gamer_token")).token;

  useEffect(() => {
    fetch(`http://localhost:8000/games/${gameId}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((game) => {
        setUpdatedGame(game);
      });
  }, [gameId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedGame.is_owner) {
      fetch(`http://localhost:8000/games/${gameId}`, {
        method: "PUT",
        body: JSON.stringify(updatedGame),
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${userToken}`,
        },
      }).then((res) => {
        setErr(false);
        if (!res.ok) {
          setErr(true);
        }

        console.log("Game Updated:", updatedGame);
        navigate("/games");
      });
    } else {
      window.alert("You can't update games that aren't yours");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create a New Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={updatedGame.title}
            onChange={handleChange}
            placeholder="Enter game title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Category
          </label>
          <CategoryRadioSet game={updatedGame} setGame={setUpdatedGame} />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={updatedGame.description}
            onChange={handleChange}
            placeholder="Enter game description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="designer"
          >
            Designer
          </label>
          <input
            type="text"
            name="designer"
            id="designer"
            value={updatedGame.designer}
            onChange={handleChange}
            placeholder="Enter designer's name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="release_year"
          >
            Release Year
          </label>
          <input
            type="date"
            name="release_year"
            id="release_year"
            value={updatedGame.release_year}
            onChange={handleChange}
            placeholder="Enter release year"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="time_to_complete_estimate"
          >
            Time to Complete (in minutes)
          </label>
          <input
            type="number"
            name="time_to_complete_estimate"
            id="time_to_complete_estimate"
            value={updatedGame.time_to_complete_estimate}
            onChange={handleChange}
            placeholder="Enter estimated time to complete"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="recommended_age"
          >
            Recommended Age
          </label>
          <input
            type="number"
            name="recommended_age"
            id="recommended_age"
            value={updatedGame.recommended_age}
            onChange={handleChange}
            placeholder="Enter recommended age"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-gray-100 rounded-sm h-9"
        >
          Submit
        </button>
        <div>
          {err ? (
            <div className="bg-orange-400 rounded-lg p-2 m-1">
              {" "}
              <p>game could not be updated</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default GameEditForm;
