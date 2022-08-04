import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeckById } from "../../modules/deckManager";
import { PlayCard } from "../card/PlayCard";
import { HearthCard } from "../card/HearthCard";
import "./Webstone.scss";

export const WebStone = () => {
  const [p1, setP1] = useState({
    hp: 30,
    mana: 1,
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
  const [attackingCard, setAttackingCard] = useState(null);
  const [defendingCard, setDefendingCard] = useState(null);
  const [turn, setTurn] = useState(1);
  const { p1DeckId, p2DeckId } = useParams();

  const navigate = useNavigate();

  //TODO: FINISH AI AND ADD WIN CONDITION POPUP THAT NAVIGATES BACK TO MAIN SCREEN ON CLICK

  useEffect(() => {
    let promArr = [];
    promArr.push(getDeckById(p1DeckId));
    promArr.push(getDeckById(p2DeckId));
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
    while (currentIndex !== 0) {
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

  const handleCardClick = (card, index) => {
    let temp = { ...p1 };
    if (turn % 2 !== 0) {
      if (p1.playCards.length < 7) {
        if (temp.mana - card.mana >= 0) {
          temp.playCards.push(card);
          temp.hand.splice(index, 1);
          temp.mana = temp.mana - card.mana;
          card.turnCount = 0;
          card.hasAttacked = false;
        } else {
          alert("You don't have enough mana to play that card.");
        }
      } else {
        alert("There can only be 7 minions in play.");
      }
    } else {
      alert("You can't play cards on your opponent's turn.");
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
      if (turn % 2 !== 0) {
        if (attackingCard === null && card.hasAttacked === false) {
          card.index = index;
          setAttackingCard(card);
        } else if (attackingCard !== null) {
          setAttackingCard(null);
        } else if (card.hasAttacked === true) {
          alert("You can't attack with the same card twice in one turn.");
        }
      } else {
        alert("You can't attack on your opponent's turn");
      }
    }

    setP1(temp);
  };

  //  set defender or tell the player what the enemy card does if they are not trying to attack it
  const handleEnemyPlayCardClick = (card, index) => {
    if (attackingCard !== null) {
      card.index = index;
      setDefendingCard(card);
    } else {
      alert(card.name + ": " + card.description);
    }
  };

  // "check to see if player wants to attack"
  useEffect(() => {
    if (attackingCard !== null && defendingCard !== null) {
      defendingCard.hp = defendingCard.hp - attackingCard.atk;
      attackingCard.hp = attackingCard.hp - defendingCard.atk;
      attackingCard.hasAttacked = true;
      if (defendingCard.hp <= 0) {
        p2.playCards.splice(defendingCard.index, 1);
      }
      if (attackingCard.hp <= 0) {
        p1.playCards.splice(attackingCard.index, 1);
      }
      setAttackingCard(null);
      setDefendingCard(null);
    }
  }, [defendingCard]);

  // "game loop when playter ends turn"
  const handleEndTurn = (evt) => {
    setTurn(turn + 1);
    p1.playCards.forEach((card) => {
      card.turnCount++;
      card.hasAttacked = false;
    });
    p2.playCards.forEach((card) => {
      card.turnCount++;
      card.hasAttacked = false;
    });
    draw(1, 1);
    draw(1, 2);
    let tempP1 = { ...p1 };
    if (turn < 10) {
      tempP1.mana = turn + 1;
    } else {
      tempP1.mana = 10;
    }
    setP1(tempP1);
    let tempP2 = { ...p2 };
    if (turn < 10) {
      tempP2.mana = turn + 1;
    } else {
      tempP2.mana = 10;
    }
    setP2(tempP2);
  };

  const handlePortraitClick = () => {
    if (attackingCard !== null) {
      let temp = { ...p2 };
      temp.hp = temp.hp - attackingCard.atk;
      setP2(temp);
    }
  };

  // very basic ai.
  useEffect(() => {
    if (turn % 2 === 0) {
      // let temp = { ...p2 };
      // for (let i = 0; i <= p2.hand.length; i++) {
      //   let found = temp.hand.find((c) => c.mana <= temp.mana);
      //   let index = temp.hand.findIndex((c) => c.mana <= temp.mana);

      //   setTimeout(() => {
      //     found.turnCount = 0;
      //     found.hasAttacked = false;
      //     temp.playCards.push(found);
      //     temp.hand.splice(index, 1);
      //     temp.mana = temp.mana - found.mana;
      //   }, 200);
      // }
      setTimeout(() => {
        handleEndTurn();
      }, 2000);
    }
  }, [turn]);

  // initial draw
  useEffect(() => {
    if (gameStarted) {
      draw(3, 1);
      draw(4, 2);
    }
  }, [gameStarted]);

  //win condition
  useEffect(() => {
    if (p1.hp <= 0) {
      console.log("DEFEAT!");
    } else if (p2.hp <= 0) {
      console.log("VICTORY");
    }
  }, [p1, p2]);

  return (
    <div className="game-board">
      <div className="p2-side">
        <div className="p2-ui">
          <div className="p2-portrait" onClick={handlePortraitClick}>
            <div className="p2-hp">
              <h2>{p2.hp}</h2>
            </div>
          </div>
          <div className="p2-hand">
            {p2.hand.map((card, index) => (
              <div className="p2-card" key={index + "p2Hand"}>
                <div
                  className="p2-card-face"
                  style={{ "--n-cards": p2.hand.length }}
                ></div>
              </div>
            ))}
          </div>
          <div className="p2-deck">{p2.deck.deckCards?.length}</div>
          <div className="p2-mana">
            <div className="mana-label">{`${p2.mana}/10`} </div>{" "}
            {(() => {
              let arr = [];
              for (let i = 1; i <= 10; i++) {
                if (p2.mana >= i) {
                  arr.push(
                    <div key={i + "-mana"} className="active-mana"></div>
                  );
                } else {
                  arr.push(
                    <div key={i + "-mana"} className="empty-mana"></div>
                  );
                }
              }
              return arr;
            })()}
          </div>
        </div>
        <div className="p2-board">
          {p2.playCards.map((card, index) => (
            <div
              className="play-card"
              key={index + "p2-play-wrapper"}
              onClick={() => handleEnemyPlayCardClick(card, index)}
            >
              <PlayCard card={card} key={index + "p2-play"} />
            </div>
          ))}
        </div>
      </div>
      {turn % 2 !== 0 ? (
        <button className="end-turn-btn" onClick={handleEndTurn}>
          End Turn
        </button>
      ) : (
        <button disabled className="opponents-end-turn-btn">
          Enemy Turn
        </button>
      )}
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
        <div className="p1-profile"></div>
        <div className="p1-ui">
          <div className="p1-portrait" onClick={handlePortraitClick}>
            <div className="p1-hp">
              <h2>{p1.hp}</h2>
            </div>
          </div>
          <div className="p1-hand">
            {p1.hand.map((card, index) => (
              <div
                className="p1-card"
                key={index + "p1Hand"}
                id={index}
                value={card}
                onClick={() => handleCardClick(card, index)}
              >
                <div
                  className="p1-card-face"
                  style={{ "--n-cards": p1.hand.length }}
                >
                  <HearthCard id={index} card={card} key={index + "p1Card"} />
                </div>
              </div>
            ))}
          </div>
          <div className="p1-deck">{p1.deck.deckCards?.length}</div>
          <div className="p1-mana">
            <div className="mana-label">{`${p1.mana}/10`} </div>{" "}
            {(() => {
              let arr = [];
              for (let i = 1; i <= 10; i++) {
                if (p1.mana >= i) {
                  arr.push(
                    <div key={i + "-mana"} className="active-mana"></div>
                  );
                } else {
                  arr.push(
                    <div key={i + "-mana"} className="empty-mana"></div>
                  );
                }
              }
              return arr;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
