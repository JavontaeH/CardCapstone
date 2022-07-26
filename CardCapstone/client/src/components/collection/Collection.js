import React, { useEffect, useState } from "react";
import * as d from "../../modules/deckManager.js";
import * as c from "../../modules/cardManager.js";
import { HearthCard } from "../card/HearthCard.js";
import { DeckCard } from "./DeckCard.js";
import { SelectedCard } from "./SelectedCard.js";
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
          <h2 className="deck-display-title">{deckSelected.name}</h2>
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
          <h2 className="deck-display-title">My Decks</h2>
          {userDecks?.map((deck) => (
            <div
              className="deck-card"
              key={deck.name + "container"}
              onClick={() => handleDeckClick(deck)}
            >
              <DeckCard deck={deck} key={deck.id} />
            </div>
          ))}
        </div>
      )}

      <div className="search-wrapper"></div>
    </div>
  );
};
