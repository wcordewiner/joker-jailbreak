import React from "react";
import { Card, Deck } from "./Model";
import { TopCard } from "./TopCard";
import "./Stack.css";

export type StackProps = {
  deck: Deck;
  onCardClick: (card: Card) => void;
  selectedCards: Set<Card>;
};

export const Stack = ({ deck, onCardClick, selectedCards }: StackProps) => {
  return (
    <div className="Stack">
      <TopCard
        card={deck.isEmpty() ? undefined : deck.peek()}
        onCardClick={onCardClick}
        nrOfCards={deck.size()}
        selectedCards={selectedCards}
      ></TopCard>
    </div>
  );
};
