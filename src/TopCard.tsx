import React from "react";
import { Card, SuitColor, SuitKind } from "./Model";
import "./common.css";
import "./TopCard.css";

export type TopCardProps = {
  card?: Card;
  onCardClick: (card: Card) => void;
  nrOfCards: number;
  selectedCards: Set<Card>;
};

export const TopCard = ({
  card,
  onCardClick,
  nrOfCards,
  selectedCards,
}: TopCardProps) => {
  let cardClassNames = "Card";
  if (card && selectedCards.has(card)) {
    cardClassNames = cardClassNames + " SelectedCard";
  }
  const symbolClassName = card
    ? card.suit.kind === SuitKind.Joker
      ? "Joker"
      : card.suit.color === SuitColor.Black
      ? "Black"
      : "Red"
    : "";
  const handleClick = () => {
    if (card) onCardClick(card);
  };

  const valueOf = (card: Card): String => {
    return card.value === 11
      ? "J"
      : card.value === 12
      ? "Q"
      : card.value === 13
      ? "K"
      : card.value.toString();
  };

  return (
    <div className={cardClassNames} onClick={handleClick}>
      <div className="CardInfo">
        {card && <span className={symbolClassName}>{card.suit.symbol}</span>}
        {card && card.suit.kind !== SuitKind.Joker && (
          <span>{valueOf(card)}</span>
        )}
        {!card && <span>X</span>}
      </div>
      {card && card.suit.kind !== SuitKind.Joker && (
        <div className="CardStackSize">
          <span>
            {nrOfCards} {nrOfCards === 1 ? "card" : "cards"}
          </span>
        </div>
      )}
    </div>
  );
};
