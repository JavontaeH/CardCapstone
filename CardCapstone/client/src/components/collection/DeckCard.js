import React from "react";

export const DeckCard = ({ deck, handleDeckClick }) => {
  return <h2 className="deck-title">{deck.name}</h2>;
};
