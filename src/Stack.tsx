import React from "react";
import { Card, Deck } from "./Model";
import { TopCard } from "./TopCard";
import "./Stack.css";

export type StackProps = {
  stack: Deck;
  onCardClick: (card: Card) => void;
  selectedCards: Set<Card>;
};

export const Stack = ({ stack, onCardClick, selectedCards }: StackProps) => {
  return (
    <div className="Stack">
      <TopCard
        card={stack.isEmpty() ? undefined : stack.peek()}
        onCardClick={onCardClick}
        nrOfCards={stack.size()}
        selectedCards={selectedCards}
      ></TopCard>
    </div>
  );
};
