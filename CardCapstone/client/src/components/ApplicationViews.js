import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { MainMenu } from "./menu/MainMenu";
import { Collection } from "./collection/Collection";
import { Play } from "./game/Play";

export default function ApplicationViews({ isLoggedIn, user }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<MainMenu isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="collection"
            element={isLoggedIn ? <Collection /> : <Navigate to="/login" />}
          />
          <Route
            path="play"
            element={isLoggedIn ? <Play /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
}
