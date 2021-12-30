import React, { useEffect, useState } from "react";
import { Card, Deck, GameState, SuitKind } from "./Model";
import { Stack } from "./Stack";
import { Controller } from "./Controller";
// import discardImage from './card-discard.svg';
import "./JokerJailBreak.css";

export type JokerJailBreakProps = {
  initialTopLeft: Deck;
  initialTopCentre: Deck;
  initialTopRight: Deck;
  initialMiddleLeft: Deck;
  initialMiddleCentre: Deck;
  initialMiddleRight: Deck;
  initialBottomLeft: Deck;
  initialBottomCentre: Deck;
  initialBottomRight: Deck;
  initialRemainder: Deck;
};

export const JokerJailBreak = ({
  initialTopLeft,
  initialTopCentre,
  initialTopRight,
  initialMiddleLeft,
  initialMiddleCentre,
  initialMiddleRight,
  initialBottomLeft,
  initialBottomCentre,
  initialBottomRight,
  initialRemainder,
}: JokerJailBreakProps) => {
  const [gameState, setGameState] = useState<GameState>(GameState.Playing);
  const [topLeft, setTopLeft] = useState<Deck>(initialTopLeft);
  const [topCentre, setTopCentre] = useState<Deck>(initialTopCentre);
  const [topRight, setTopRight] = useState<Deck>(initialTopRight);
  const [middleLeft, setMiddleLeft] = useState<Deck>(initialMiddleLeft);
  const [middleCentre, setMiddleCentre] = useState<Deck>(initialMiddleCentre);
  const [middleRight, setMiddleRight] = useState<Deck>(initialMiddleRight);
  const [bottomLeft, setBottomLeft] = useState<Deck>(initialBottomLeft);
  const [bottomCentre, setBottomCentre] = useState<Deck>(initialBottomCentre);
  const [bottomRight, setBottomRight] = useState<Deck>(initialBottomRight);
  const [remainder, setRemainder] = useState<Deck>(initialRemainder);
  const [selectedCards, setSelectedCards] = useState<Set<Card>>(new Set());

  const createNewGame = () => {
    window.location.reload();
  };

  const toggleSelectedCard = (card: Card) => {
    if (card.suit.kind === SuitKind.Joker) {
      return;
    }
    const newSelectedCards = new Set<Card>(selectedCards);
    if (selectedCards.has(card)) {
      console.info("Unselect " + card.suit.symbol + " " + card.value);
      newSelectedCards.delete(card);
    } else {
      console.info("Select " + card.suit.symbol + " " + card.value);
      newSelectedCards.add(card);
    }
    setSelectedCards(newSelectedCards);
  };

  const removeTopCardFromDeck = (
    deck: Deck,
    setDeck: (newDeck: Deck) => void
  ): Card => {
    const [cardsDrawn, cardsRemaining] = deck.draws(1);
    setDeck(cardsRemaining);
    return cardsDrawn.peek();
  };

  const removeTopCardsFromDeck = (
    cardsToRemove: Set<Card>,
    deck: Deck,
    setDeck: (newDeck: Deck) => void
  ) => {
    if (deck.isNotEmpty() && cardsToRemove.has(deck.peek())) {
      removeTopCardFromDeck(deck, setDeck);
    }
  };

  const removeAllSelectedCards = () => {
    removeTopCardsFromDeck(selectedCards, topLeft, setTopLeft);
    removeTopCardsFromDeck(selectedCards, topCentre, setTopCentre);
    removeTopCardsFromDeck(selectedCards, topRight, setTopRight);
    removeTopCardsFromDeck(selectedCards, middleLeft, setMiddleLeft);
    removeTopCardsFromDeck(selectedCards, middleCentre, setMiddleCentre);
    removeTopCardsFromDeck(selectedCards, middleRight, setMiddleRight);
    removeTopCardsFromDeck(selectedCards, bottomLeft, setBottomLeft);
    removeTopCardsFromDeck(selectedCards, bottomCentre, setBottomCentre);
    removeTopCardsFromDeck(selectedCards, bottomRight, setBottomRight);
    setSelectedCards(new Set());
  };

  const drawRemainderCard = () => {
    const card: Card = removeTopCardFromDeck(remainder, setRemainder);
    setMiddleCentre(middleCentre.addCardOnTop(card));
  };

  useEffect(() => {
    if (
      (topCentre.isEmpty() ||
        middleLeft.isEmpty() ||
        middleRight.isEmpty() ||
        bottomCentre.isEmpty()) &&
      middleCentre.size() === 1
    ) {
      setGameState(GameState.Win);
    }
  }, [
    topCentre,
    middleLeft,
    middleRight,
    bottomCentre,
    middleCentre,
    setGameState,
  ]);

  return (
    <div className="JokerJailBreak">
      <div className="Row">
        <Stack
          stack={topLeft}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
        <Stack
          stack={topCentre}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
        <Stack
          stack={topRight}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
      </div>
      <div className="Row">
        <Stack
          stack={middleLeft}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
        <Stack
          stack={middleCentre}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
        <Stack
          stack={middleRight}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
      </div>
      <div className="Row">
        <Stack
          stack={bottomLeft}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
        <Stack
          stack={bottomCentre}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
        <Stack
          stack={bottomRight}
          onCardClick={toggleSelectedCard}
          selectedCards={selectedCards}
        />
      </div>
      <Controller
        gameState={gameState}
        onNewGame={createNewGame}
        selectedCards={selectedCards}
        onRemoveSelectedCards={removeAllSelectedCards}
        jokerDeck={middleCentre}
        remainderDeck={remainder}
        onDrawRemainderCard={drawRemainderCard}
      />
    </div>
  );
};
