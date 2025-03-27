import { useEffect } from "react";

const GameSelect = ({ games, fetchGames, setGameImage }) => {
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="w-full max-w-s mx-auto">
      <select
        onChange={({ target: { value } }) => {
          setGameImage((prev) => ({
            ...prev,
            game: parseInt(value),
          }));
        }}
        className="block w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value={null}>Choose a game</option>
        {games.map((g) => (
          <option key={g.id} value={g.id}>
            {g.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameSelect;
