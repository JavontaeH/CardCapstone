import React from "react";

export const SelectedCard = ({ card, deckCards }) => {
  return (
    <>
      <h2>{card.mana}</h2>
      <h2>{card.name}</h2>
      {/* <h2>{card.count}</h2> */}
    </>
  );
};
