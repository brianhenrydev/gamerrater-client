import { createGameImageString } from "../../utils/base64";

import React, { useState } from "react";
import GameSelect from "../select/GameSelect";

const GameImageUpload = ({ games, fetchGames }) => {
  const [gameImage, setGameImage] = useState({
    game: 0,
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userToken = JSON.parse(localStorage.getItem("gamer_token")).token;

  const handleImageChange = (event) => {
    createGameImageString(event, setGameImage, "image");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!gameImage.image || !gameImage.game) {
      setError("Please select an image and choose a game.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${userToken}`,
        },
        body: JSON.stringify(gameImage),
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
              setGameImage={setGameImage}
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
