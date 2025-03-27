import { useEffect, useState } from "react";

const GamePictures = ({ games, fetchGames }) => {
  const [gamePictures, setGamePictures] = useState([]);
  const [gameFilter, setGameFilter] = useState(0);
  const [filteredPics, setFilteredPics] = useState(gamePictures);

  useEffect(() => {
    fetch("http://localhost:8000/images", {
      method: "GET",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((images) => {
        setGamePictures(images.reverse());
        fetchGames();
        setFilteredPics(images);
      });
  }, []);

  useEffect(() => {
    if (isNaN(gameFilter)) {
      setFilteredPics(gamePictures);
    } else if (!isNaN(gameFilter)) {
      setFilteredPics(() =>
        gamePictures.filter((p) => parseInt(p.game.id) === gameFilter),
      );
    }
  }, [gameFilter]);

  return (
    <div>
      <div>
        <div>select game</div>
        <select
          onChange={({ target: { value: gameId } }) => {
            setGameFilter(parseInt(gameId));
          }}
        >
          <option value={null}>default</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        {filteredPics.map((gp) => (
          <div key={gp.id} className="mx-12">
            <div>
              <img src={gp.image} alt="game image" />
            </div>
            <div>{gp.game.title}</div>
            <div>{gp.user.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePictures;
