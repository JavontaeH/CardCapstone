import React, { Component } from "react";
import {
  RenderCard,
  Frame,
  Cost,
  Image,
  Title,
  Set,
  Rarity,
  Text,
  Strength,
  Health,
  Race,
} from "./RenderCard";
import { CardElements } from "./CardElements";
//TODO: CARD TITLE SHRINK TO FIT OR LESS CARD LENGTH
export const HearthCard = ({ card }) => {
  return (
    <RenderCard>
      <Image id={card.imageLocation} clip />
      <Frame />
      <Cost fontFamily="Belwe">{card.mana ? card.mana : "0"}</Cost>
      <Race fontFamily="Belwe">{card.cardType?.name}</Race>
      <Health fontFamily="Belwe">{card.hp}</Health>
      <Strength fontFamily="Belwe">{card.atk}</Strength>
      <Rarity id="common" />
      <Title fontFamily="Belwe" flow>
        {card.name}
      </Title>
      <Text rich fontfamily="BelweMed">
        {card.description}
      </Text>
    </RenderCard>
  );
};
