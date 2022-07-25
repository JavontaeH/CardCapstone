import React, { useEffect, useState } from "react";
import * as d from "../../modules/deckManager.js";
import * as c from "../../modules/cardManager.js";
// import { HearthCard } from "../card/HearthCard.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Deck } from "./Deck.js";
import { CollectionCard } from "./CollectionCard.js";
import "./Collection.css";

export const Collection = ({ user }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [deckSelected, setDeckSelected] = useState(false);
  //TODO: REPLACE STATIC ID WITH USER ID
  const userId = 1;

  const getUserDecks = (id) => {
    d.getAllUserDecks(id).then((decks) => {
      setUserDecks(decks);
    });
  };

  const getCards = () => {
    c.getAllCards().then((cards) => {
      setCards(cards);
    });
  };

  const handleDeckClick = (deck) => {
    setDeckSelected(deck);
  };

  useEffect(() => {
    getUserDecks(userId);
    getCards();
  }, []);

  return (
    <div className="collection-wrapper">
      <div className="card-display">
        <div className="card-list">
          {cards.map((card) => (
            <CollectionCard card={card} key={card.id} />
          ))}
        </div>
      </div>
      {deckSelected
        ? ""
        : // <div className="deck-list">
          //   {userDecks?.map((deck) => (
          //     <Deck deck={deck} key={deck.id} handleDeckClick={handleDeckClick} />
          //   ))}
          // </div>
          ""}

      <div className="search-wrapper"></div>
    </div>
  );
};
