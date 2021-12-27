import { Card, Clubs, Deck, Diamonds, Hearts, Spades } from "./Model";

export const create52CardDeck = (): Deck => {
  let cards: Array<Card> = [];
  [Clubs, Diamonds, Hearts, Spades].forEach((cardSuit) => {
    for (let cardValue = 1; cardValue <= 13; cardValue++) {
      cards.push({ suit: cardSuit, value: cardValue });
    }
  });
  return new Deck(cards);
};

export const shuffleDeck = (deck: Deck): Deck => {
  const cards: Array<Card> = deck.cards();
  let currentIndex = cards.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }

  return new Deck(cards);
};
