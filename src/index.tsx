import React from "react";
import ReactDOM from "react-dom";
import { Deck, JokerCard } from "./Model";
import { JokerJailBreak } from "./JokerJailBreak";
import { create52CardDeck, shuffleDeck } from "./Utils";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const createJokerJailBreak = () => {
  let deck: Deck = shuffleDeck(create52CardDeck());
  let topLeft: Deck;
  let topCentre: Deck;
  let topRight: Deck;
  let middleLeft: Deck;
  let middleCentre: Deck;
  let middleRight: Deck;
  let bottomLeft: Deck;
  let bottomCentre: Deck;
  let bottomRight: Deck;
  let remainder: Deck;
  [topLeft, deck] = deck.draws(3);
  [topCentre, deck] = deck.draws(7);
  [topRight, deck] = deck.draws(3);
  [middleLeft, deck] = deck.draws(3);
  middleCentre = new Deck([JokerCard]);
  [middleRight, deck] = deck.draws(3);
  [bottomLeft, deck] = deck.draws(3);
  [bottomCentre, deck] = deck.draws(7);
  [bottomRight, deck] = deck.draws(3);
  remainder = deck;
  return (
    <JokerJailBreak
      initialTopLeft={topLeft}
      initialTopCentre={topCentre}
      initialTopRight={topRight}
      initialMiddleLeft={middleLeft}
      initialMiddleCentre={middleCentre}
      initialMiddleRight={middleRight}
      initialBottomLeft={bottomLeft}
      initialBottomCentre={bottomCentre}
      initialBottomRight={bottomRight}
      initialRemainder={remainder}
    />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <div className="center">
      <h1 className="text-center">Joker Jailbreak</h1>
      {createJokerJailBreak()}
      <div className="footer">
        <span>Game page and rules can be found </span>
        <a
          href="https://roofkat.itch.io/joker-jailbreak"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </div>
      <div className="footer">
        <span>
          Game created by Ramon Huiskamp (roofkat). Web version by Wouter
          Cordewiner. Source code available{" "}
        </span>
        <a
          href="https://github.com/wcordewiner/wcordewiner.github.io/tree/main/joker-jailbreak"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
