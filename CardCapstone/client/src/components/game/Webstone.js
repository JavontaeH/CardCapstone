import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const WebStone = () => {
  const [p1Deck, setP1Deck] = useState([]);
  const [p2Deck, setP2Deck] = useState([]);
  const [p1PlayCards, setP1PlayCards] = useState([]);
  const [p2PlayCards, setP2PlayCards] = useState([]);
  const [p1Hand, setP1Hand] = useState([]);
  const [p2Hand, setP2Hand] = useState([]);
  const [p1Mana, setP1Mana] = useState(1);
  const [p2Mana, setP2Mana] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      <p>hi</p>
      <p>poop</p>
    </>
  );
};
