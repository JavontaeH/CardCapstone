import React, { Component } from "react";
import { RenderFrame, Frame, Image, Strength, Health } from "./RenderFrame";
export const PlayCard = ({ card }) => {
  return (
    <RenderFrame>
      <Image id="/images/card-art/Chillwind_Yeti.png" clip />
      <Frame />
      <Health fontFamily="Belwe">1</Health>
      <Strength fontFamily="Belwe">1</Strength>
    </RenderFrame>
  );
};
