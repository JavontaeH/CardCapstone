import React from "react";

export const SelectedCard = ({ card, deckCards }) => {
  return (
    <>
      <span className="card-row-cost">{card.mana}</span>
      <span className="card-row-name">{card.name}</span>
      <div className="card-row-fill"></div>
      <span className="card-row-count"></span>
    </>
  );
};
