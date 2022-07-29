import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d from "../../modules/deckManager.js";
import * as c from "../../modules/cardManager.js";
import { HearthCard } from "../card/HearthCard.js";
import { DeckCard } from "./DeckCard.js";
import { SelectedCard } from "./SelectedCard.js";
import { deleteDeck } from "../../modules/deckManager";
import { getLoggedInUser } from "../../modules/userProfileManager.js";

import "./Collection.css";

export const Collection = ({ user }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [userId, setUserId] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [manaSearch, setManaSearch] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser().then((res) => {
      setUserId(res.id);
      getUserDecks(res.id);
    });

    getCards();
  }, []);

  //TODO: SCROLL TO BOTTOM WHEN CARD ADDED
  //TODO: ADD USER INPUT VALIDATION... DECK NAME, AMT OF CARDS IN DECK TO PLAY.

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

  //TODO: change selectedDeck state to an obj of key:value pairs where the key is the cardId and the value is the amt of that card. and increment/decrement based on if the key
  const handleCardClick = (card) => {
    if (selectedDeck) {
      let tempDeck = { ...selectedDeck };
      tempDeck.deckCards.push(card);
      setSelectedDeck(tempDeck);
    } else {
      console.log(card);
    }
  };

  const handleDeckCardClick = (card, index) => {
    let tempDeck = { ...selectedDeck };
    tempDeck.deckCards.splice(index, 1);
    setSelectedDeck(tempDeck);
  };

  const handleDeckClick = (deck) => {
    setSelectedDeck(deck);
  };

  const handleDeleteClick = (evt) => {
    console.log("hi");
    deleteDeck(evt.target.id).then(() => {
      getUserDecks(userId);
    });
    setSelectedDeck(false);
  };

  const handleDoneClick = () => {
    if (selectedDeck) {
      if (selectedDeck.id) {
        d.editDeck(selectedDeck).then(() => {
          d.UpdateDeckCards(selectedDeck).then(() => {
            getUserDecks(userId);
          });
          setSelectedDeck(false);
        });
      } else {
        d.addDeck(selectedDeck).then((res) => {
          selectedDeck.id = res.id;
          d.UpdateDeckCards(selectedDeck).then(() => {
            getUserDecks(userId);
          });
        });
        setSelectedDeck(false);
      }
    } else {
      navigate("../");
    }
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...selectedDeck };
    stateToChange[evt.target.id] = evt.target.value;
    setSelectedDeck(stateToChange);
  };

  const handleNewDeckClick = () => {
    setSelectedDeck({
      name: "New Deck",
      userId: userId,
      deckCode: Math.round(Math.random() * 9001).toString(),
      deckCards: [],
    });
  };

  const handleTextSearch = (evt) => {
    setTextSearch(evt.target.value);
    if (evt.target.value != "") {
      c.textSearchCards(evt.target.value).then((res) => {
        setCards(res);
      });
    } else {
      getCards();
    }
  };

  const handleManaSearch = (evt) => {
    if (manaSearch != evt.target.value) {
      setManaSearch(evt.target.value);
      c.manaSearchCards(evt.target.value).then((res) => {
        setCards(res);
      });
    } else {
      getCards();
      setManaSearch(0);
    }
  };

  return (
    <div className="collection-wrapper">
      <div className="card-display">
        <div className="card-list">
          {cards.map((card) => (
            <div
              className="collection-card"
              key={card.name + "container"}
              onClick={() => handleCardClick(card)}
            >
              <HearthCard card={card} key={card.id} />
            </div>
          ))}
        </div>
      </div>
      {selectedDeck ? (
        <div className="deck-display">
          <div className="deck-display-innards">
            <div className="deck-title-container">
              <input
                className="deck-display-title-input"
                id="name"
                onChange={handleFieldChange}
                value={selectedDeck.name}
                required
                autoFocus
              />
              <button
                className="delete-button"
                id={selectedDeck.id}
                onClick={handleDeleteClick}
              >
                X
              </button>
            </div>
            <div className="deck-list">
              {selectedDeck.deckCards.map((card, index) => (
                <div
                  className="card-span"
                  key={index + "key"}
                  style={{
                    backgroundImage: `url(${card.imageLocation})`,
                    backgroundPosition: "center",
                    backgroundSize: "85%",
                    backgroundRepeat: "no-repeat",
                  }}
                  onClick={() => {
                    handleDeckCardClick(card, index);
                  }}
                >
                  <SelectedCard card={card} key={card.id} />
                </div>
              ))}
            </div>
          </div>
          <div className="deck-list-buttons-container">
            <div className="deck-list-buttons">
              {selectedDeck ? (
                <button
                  className="finish-button"
                  onClick={() => handleDoneClick()}
                >
                  Done
                </button>
              ) : (
                <button
                  className="finish-button"
                  onClick={() => handleDoneClick()}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="deck-display">
          <div className="deck-display-innards">
            <div className="deck-title-container">
              <h2 className="deck-display-title">My Decks</h2>
            </div>
            <div className="deck-list">
              {userDecks?.map((deck) => (
                <div
                  className="deck-card"
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
          </div>
          <div className="deck-list-buttons-container">
            <div className="deck-list-buttons">
              <button
                className="new-deck-button"
                onClick={() => handleNewDeckClick()}
              >
                New Deck
              </button>
              {selectedDeck ? (
                <button
                  className="finish-button"
                  onClick={() => handleDoneClick()}
                >
                  Done
                </button>
              ) : (
                <button
                  className="finish-button"
                  onClick={() => handleDoneClick()}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="search-wrapper">
        <div className="mana-search">
          <button className="mana" value={1} onClick={handleManaSearch}>
            1
          </button>
          <button className="mana" value={2} onClick={handleManaSearch}>
            2
          </button>
          <button className="mana" value={3} onClick={handleManaSearch}>
            3
          </button>
          <button className="mana" value={4} onClick={handleManaSearch}>
            4
          </button>
          <button className="mana" value={5} onClick={handleManaSearch}>
            5
          </button>
          <button className="mana" value={6} onClick={handleManaSearch}>
            6
          </button>
          <button className="mana" value={7} onClick={handleManaSearch}>
            7+
          </button>
        </div>
        <div className="text-search">
          <input
            className="text-input"
            id="textSearch"
            onChange={handleTextSearch}
            value={textSearch}
            required
            autoFocus
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
};
