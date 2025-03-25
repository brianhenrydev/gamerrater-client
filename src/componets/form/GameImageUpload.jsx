import React, { useState } from "react";
import GameSelect from "../select/gameSelect";

const GameImageUpload = ({ games, fetchGames }) => {
  const [image, setImage] = useState(null);
  const [gameId, setGameId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userToken = JSON.parse(localStorage.getItem("gamer_token")).token;

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!image || !gameId) {
      setError("Please select an image and choose a game.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("game", gameId);

    try {
      const response = await fetch("http://localhost:8000/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `token ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setSuccess("Image uploaded successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Game Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <GameSelect
              games={games}
              fetchGames={fetchGames}
              setGameId={setGameId}
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Upload
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};
export default GameImageUpload;
