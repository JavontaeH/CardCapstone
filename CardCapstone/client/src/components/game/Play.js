import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d from "../../modules/deckManager.js";
import * as c from "../../modules/cardManager.js";
import { HearthCard } from "../card/HearthCard.js";
import { DeckCard } from "../collection/DeckCard.js";
import { deleteDeck } from "../../modules/deckManager";
import { getLoggedInUser } from "../../modules/userProfileManager.js";

import "./Play.css";

export const Play = ({ user }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [userId, setUserId] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    getLoggedInUser().then((res) => {
      setUserId(res.id);
      getUserDecks(res.id);
    });

    getCards();
  }, []);

  const handleCollectionClick = (e) => {
    navigate("../collection");
  };

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
  };

  return (
    <div className="play-wrapper">
      <div className="play-deck-display">
        <h2 className="choose-deck-title">
          <span>Choose Your Deck</span>
        </h2>
        <div className="play-deck-list">
          {userDecks?.map((deck) => (
            <div
              className="play-deck-card"
              key={deck.id + "key"}
              style={
                deck.deckCards.length >= 1
                  ? {
                      backgroundImage: `url(${deck.deckCards[0]?.imageLocation})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }
                  : {
                      backgroundImage: `url(images/card-art/Angry_Chicken.png)`,
                      backgroundPosition: "20% 25%",
                      backgroundSize: "cover",
                    }
              }
              onClick={() => {
                handleDeckClick(deck);
              }}
            >
              <DeckCard
                deck={deck}
                key={deck.id}
                getUserDecks={() => getUserDecks()}
              />
            </div>
          ))}
        </div>
        <div className="play-deck-btn-container">
          <button className="collection-button" onClick={handleCollectionClick}>
            My Collection
          </button>
        </div>
      </div>
      <div className="play-display">
        <div className="selected-deck-container"></div>
      </div>
    </div>
  );
};
