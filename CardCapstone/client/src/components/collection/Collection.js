import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d from "../../modules/deckManager.js";
import * as c from "../../modules/cardManager.js";
import { HearthCard } from "../card/HearthCard.js";
import { DeckCard } from "./DeckCard.js";
import { SelectedCard } from "./SelectedCard.js";
import { deleteDeck } from "../../modules/deckManager";

import "./Collection.css";

export const Collection = ({ user }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [deckSelected, setDeckSelected] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [manaSearch, setManaSearch] = useState(0);
  const navigate = useNavigate();

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

  //TODO: change deckSelected state to an obj of key:value pairs where the key is the cardId and the value is the amt of that card. and increment/decrement based on if the key
  const handleCardClick = (card) => {
    if (deckSelected) {
      let tempDeck = { ...deckSelected };
      tempDeck.deckCards.push(card);
      setDeckSelected(tempDeck);
    } else {
      console.log(card);
    }
  };

  const handleDeckCardClick = (card, index) => {
    let tempDeck = { ...deckSelected };
    tempDeck.deckCards.splice(index, 1);
    setDeckSelected(tempDeck);
  };

  const handleDeckClick = (deck) => {
    setDeckSelected(deck);
  };

  const handleDeleteClick = (evt) => {
    evt.stopPropagation();
    deleteDeck(evt.target.id).then(() => {
      getUserDecks(userId);
    });
  };

  const handleDoneClick = () => {
    if (deckSelected) {
      if (deckSelected.id) {
        d.editDeck(deckSelected).then(() => {
          d.UpdateDeckCards(deckSelected).then(() => {
            getUserDecks(userId);
          });
          setDeckSelected(false);
        });
      } else {
        d.addDeck(deckSelected).then((res) => {
          deckSelected.id = res.id;
          d.UpdateDeckCards(deckSelected).then(() => {
            getUserDecks(userId);
          });
        });
        setDeckSelected(false);
      }
    } else {
      navigate("../menu");
    }
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...deckSelected };
    stateToChange[evt.target.id] = evt.target.value;
    setDeckSelected(stateToChange);
  };

  const handleNewDeckClick = () => {
    setDeckSelected({
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

  useEffect(() => {
    getUserDecks(userId);
    getCards();
  }, []);

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
      {deckSelected ? (
        <div className="deck-display">
          <input
            className="deck-display-title"
            id="name"
            onChange={handleFieldChange}
            value={deckSelected.name}
            required
            autoFocus
          />
          {deckSelected.deckCards.map((card, index) => (
            <div
              className="deck-selected-card"
              key={index + "-container"}
              onClick={() => handleDeckCardClick(card, index)}
            >
              <SelectedCard
                card={card}
                key={card.id}
                deckCards={deckSelected.deckCards}
              />
            </div>
          ))}
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
                  onClick={() => {
                    handleDeckClick(deck);
                  }}
                >
                  <DeckCard
                    deck={deck}
                    key={deck.id}
                    getUserDecks={() => getUserDecks()}
                  />
                  <button
                    className="delete"
                    href="#"
                    id={deck.id}
                    onClick={handleDeleteClick}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="deck-list-buttons">
              <button
                className="new-deck-button"
                onClick={() => handleNewDeckClick()}
              >
                New Deck
              </button>
              {deckSelected ? (
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
          />
        </div>
      </div>
    </div>
  );
};
