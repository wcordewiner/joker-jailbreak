import React from "react";
import { Card, Deck, GameState, SuitColor } from './Model';
import Button from "react-bootstrap/Button";
import "./common.css";
import "./Controller.css";

export type ControllerProps = {
  gameState: GameState;
  onNewGame: () => void;
  selectedCards: Set<Card>;
  onRemoveSelectedCards: () => void;
  jokerDeck: Deck;
  remainderDeck: Deck;
  onDrawRemainderCard: () => void;
};

export const Controller = ({
  gameState,
  onNewGame,
  selectedCards,
  onRemoveSelectedCards,
  jokerDeck,
  remainderDeck,
  onDrawRemainderCard,
}: ControllerProps) => {
  const add = (accumulator: number, a: number): number => {
    return accumulator + a;
  };
  const red = Array.from(selectedCards)
    .filter((card) => card.suit.color === SuitColor.Red)
    .map((card) => card.value)
    .reduce(add, 0);
  const black = Array.from(selectedCards)
    .filter((card) => card.suit.color === SuitColor.Black)
    .map((card) => card.value)
    .reduce(add, 0);

  const removeDisabled: boolean = red === 0 || red !== black;
  const removeButtonClassName =
    "Button" + (removeDisabled ? " ButtonDisabled" : " ButtonEnabled");

  const drawRemainderDisabled =
    remainderDeck.isEmpty() || jokerDeck.size() === 4;
  const drawRemainderButtonClassName =
    "Button" + (drawRemainderDisabled ? " ButtonDisabled" : " ButtonEnabled");

  return (
    <div>
      <div className="CardStrengthRow">
        <div className="StrengthRedName">Red</div>
        <div className="StrengthRedNumber Red">{red}</div>
        <div className="StrengthDivider">{removeDisabled ? "⇎" : "⇔"}</div>
        {/* <div className="StrengthDivider"><img src={discardImage} alt="Remove cards"></img></div> */}
        <div className="StrengthBlackNumber">{black}</div>
        <div className="StrengthBlackName">Black</div>
      </div>
      <div className="CardStrengthRow">
        {gameState === GameState.Playing && <Button
          className={removeButtonClassName}
          disabled={removeDisabled}
          onClick={onRemoveSelectedCards}
        >
          Remove
        </Button>}
        {gameState === GameState.Playing && <Button
          className={drawRemainderButtonClassName}
          disabled={drawRemainderDisabled}
          onClick={onDrawRemainderCard}
        >
          {`Draw remainder (${remainderDeck.size()})`}
        </Button>}
        {gameState === GameState.Win && <div className="Win"><span>Win!</span></div>}
        <Button className={"Button"} onClick={onNewGame}>
          New Game
        </Button>
      </div>
    </div>
  );
};
