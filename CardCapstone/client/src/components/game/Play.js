import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d from "../../modules/deckManager.js";
import { DeckCard } from "../collection/DeckCard.js";
import { getLoggedInUser } from "../../modules/userProfileManager.js";

import "./Play.css";

export const Play = ({ user }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(false);
  const navigate = useNavigate();

  const getUserDecks = (id) => {
    d.getAllUserDecks(id).then((decks) => {
      setUserDecks(decks);
    });
  };

  useEffect(() => {
    getLoggedInUser().then((res) => {
      getUserDecks(res.id);
    });
  }, []);

  const handleCollectionClick = (e) => {
    navigate("../collection");
  };

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
  };

  const handleBtnClick = (e) => {
    if (e.target.id === "edit-btn") {
      if (selectedDeck) {
        navigate("../collection", { state: { selectedDeck: selectedDeck } });
      } else {
        alert("Please select a deck to edit.");
      }
    } else if (e.target.id === "play-btn") {
      if (selectedDeck.id) {
        navigate(`../play/webstone/${selectedDeck.id}/18`);
      } else {
        alert("Please select a deck to play.");
      }
    } else if (e.target.id === "back-btn") {
      navigate("../");
    }
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
        <div className="selected-deck-container">
          {selectedDeck ? (
            selectedDeck?.deckCards?.length >= 1 ? (
              <img
                className="selected-deck-image"
                src={selectedDeck?.deckCards[0]?.imageLocation}
                alt="selected deck image"
              />
            ) : (
              <img
                className="selected-deck-image"
                src="images/card-art/Angry_Chicken.png"
                alt="selected deck image"
              />
            )
          ) : (
            <img className="empty-selected-deck-image" />
          )}
          <h2 className="choose-deck-title">
            <span>{selectedDeck.name}</span>
          </h2>
          <div className="selected-deck-btn-container">
            <button id="edit-btn" className="ed-btn" onClick={handleBtnClick}>
              EDIT
            </button>
            <button id="play-btn" className="ply-btn" onClick={handleBtnClick}>
              PLAY
            </button>
            <button id="back-btn" className="bck-btn" onClick={handleBtnClick}>
              BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
