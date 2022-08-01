import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDeckById } from "../../modules/deckManager";
import { PlayCard } from "../card/PlayCard";
import { HearthCard } from "../card/HearthCard";
import "./Webstone.scss";

export const WebStone = () => {
  const [p1, setP1] = useState({
    hp: 30,
    mana: 10,
    deck: [],
    hand: [],
    playCards: [],
  });
  const [p2, setP2] = useState({
    hp: 30,
    mana: 1,
    deck: [],
    hand: [],
    playCards: [],
  });
  const [gameStarted, setGameStarted] = useState(false);

  const navigate = useNavigate();

  //TODO: make deck dynamic for p1
  useEffect(() => {
    let promArr = [];
    promArr.push(getDeckById(18));
    promArr.push(getDeckById(2));
    Promise.all(promArr)
      .then((res) => {
        let tempP1 = { ...p1 };
        tempP1.deck = shuffle(res[0]);
        setP1(tempP1);
        let tempP2 = { ...p2 };
        tempP2.deck = shuffle(res[1]);
        setP2(tempP2);
      })
      .then(() => {
        setGameStarted(true);
      });
  }, []);

  const shuffle = (deck) => {
    let currentIndex = deck.deckCards.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [deck.deckCards[currentIndex], deck.deckCards[randomIndex]] = [
        deck.deckCards[randomIndex],
        deck.deckCards[currentIndex],
      ];
    }
    return deck;
  };
  const draw = (count, player) => {
    if (player === 1) {
      let temp = { ...p1 };
      for (let i = 0; i < count; i++) {
        if (temp.deck.deckCards[0]) {
          temp.hand.push(temp.deck.deckCards[0]);
          temp.deck.deckCards.splice(0, 1);
        } else {
          temp.hp = temp.hp - 1;
        }
      }
      setP1(temp);
    }
    if (player === 2) {
      let temp = { ...p2 };
      for (let i = 0; i < count; i++) {
        if (temp.deck.deckCards[0]) {
          if (temp.hand.length < 10) {
            temp.hand.push(temp.deck.deckCards[0]);
          }
          temp.deck.deckCards.splice(0, 1);
        } else {
          temp.hp = temp.hp - 1;
        }
      }
      setP2(temp);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      draw(10, 1);
      draw(4, 2);
    }
  }, [gameStarted]);

  const handleCardClick = (card, index) => {
    let temp = { ...p1 };
    if (temp.mana - card.mana >= 0) {
      temp.playCards.push(card);
      temp.hand.splice(index, 1);
      temp.mana = temp.mana - card.mana;
      card.turnCount = 0;
    } else {
      alert("You don't have enough mana to play that card!");
    }
    setP1(temp);
  };

  const handlePlayCardClick = (card, index) => {
    let temp = { ...p1 };
    if (card.turnCount === 0) {
      temp.hand.push(card);
      temp.playCards.splice(index, 1);
      temp.mana = temp.mana + card.mana;
    } else {
      alert(
        "You cannot remove a card from the board after it has been played for more than one turn."
      );
    }

    setP1(temp);
  };

  const tempHandleClick = () => {
    draw(5, 2);
  };

  return (
    <div className="game-board">
      <div className="p2-side">
        <div className="p2-ui">
          <div className="p2-hand">
            {p2.hand.map((card, index) => (
              <div className="p2-card" key={index + "p2Hand"}></div>
            ))}
          </div>
          <div className="p2-deck" onClick={tempHandleClick}>
            {p2.deck.deckCards?.length}
          </div>
        </div>
        <div className="p2-board">
          {p2.playCards.map((card, index) => (
            <div className="play-card">
              <PlayCard card={card} key={index + "p2-play"} />
            </div>
          ))}
        </div>
      </div>
      <div className="p1-side">
        <div className="p1-board">
          {p1.playCards.map((card, index) => (
            <div
              className="play-card"
              key={index + "p1-play-wrapper"}
              onClick={() => handlePlayCardClick(card, index)}
            >
              <PlayCard card={card} key={index + "p1-play"} />
            </div>
          ))}
        </div>
        <div className="p1-ui">
          <div className="p1-deck">{p1.deck.deckCards?.length}</div>
          <div className="p1-hand">
            {p1.hand.map((card, index) => (
              <div
                className="p1-card"
                key={index + "p1Hand"}
                id={index}
                value={card}
                onClick={() => handleCardClick(card, index)}
              >
                <div className="p1-card-face">
                  <HearthCard id={index} card={card} key={index + "p1Card"} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
