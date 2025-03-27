import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import Home from "../pages/Home";
import GameList from "./GameList.jsx";
import { Register } from "../pages/Register.jsx";
import GameImageUpload from "./form/B64GameImageUpload.jsx";
import GamePictures from "./GamePictures.jsx";
import GameDetails from "./GameDetails.jsx";
import GameCreateForm from "./form/GameCreateForm.jsx";
import GameReview from "./form/GameReview.jsx";
import GameEditForm from "./form/GameEdit.jsx";

export const ApplicationViews = () => {
  const [gamesState, setgamesState] = useState([
    { id: 0, title: "Error fetching data" },
  ]);

  const fetchGames = () => {
    return fetch("http://localhost:8000/games?orderby=created_at", {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("gamer_token")).token}`,
      },
    })
      .then((res) => res.json())
      .then((games) => {
        setgamesState(games.reverse());
      });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route path="/games">
            <Route
              index
              element={
                <GameList
                  loc={{ to: "games" }}
                  games={gamesState}
                  fetchGames={fetchGames}
                />
              }
            />
            <Route path=":gameId">
              <Route index element={<GameDetails />} />
              <Route path="review" element={<GameReview />} />
              <Route path="edit" element={<GameEditForm />} />
            </Route>
          </Route>
          <Route
            path="/new-post"
            element={
              <GameImageUpload games={gamesState} fetchGames={fetchGames} />
            }
          />
          <Route
            path="/posts"
            element={
              <GamePictures games={gamesState} fetchGames={fetchGames} />
            }
          />
          <Route path="/create" element={<GameCreateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
