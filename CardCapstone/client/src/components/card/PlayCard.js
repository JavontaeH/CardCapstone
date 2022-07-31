import React, { Component } from "react";
import { RenderFrame, Frame, Image, Strength, Health } from "./RenderFrame";
export const PlayCard = ({ card }) => {
  return (
    <RenderFrame>
      <Image id={card.imageLocation} clip />
      <Frame />
      <Health fontFamily="Belwe">{card.hp}</Health>
      <Strength fontFamily="Belwe">{card.atk}</Strength>
    </RenderFrame>
  );
};
