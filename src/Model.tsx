export enum GameState {
  Playing,
  Win,
}

export enum SuitKind {
  Clubs,
  Diamonds,
  Hearts,
  Spades,
  Joker,
}

export enum SuitColor {
  Red,
  Black,
}

export interface Suit {
  kind: SuitKind;
  color: SuitColor;
  symbol: String;
}

export const Clubs: Suit = {
  kind: SuitKind.Clubs,
  color: SuitColor.Black,
  symbol: "♣",
};

export const Diamonds: Suit = {
  kind: SuitKind.Diamonds,
  color: SuitColor.Red,
  symbol: "♦",
};

export const Hearts: Suit = {
  kind: SuitKind.Hearts,
  color: SuitColor.Red,
  symbol: "♥",
};

export const Spades: Suit = {
  kind: SuitKind.Spades,
  color: SuitColor.Black,
  symbol: "♠",
};

const Joker: Suit = {
  kind: SuitKind.Joker,
  color: SuitColor.Black,
  symbol: "🃏",
};

export interface Card {
  suit: Suit;
  value: number;
}

export const JokerCard: Card = {
  suit: Joker,
  value: 0,
};

export class Deck {
  private cardArray: Array<Card>;

  constructor(cards: Array<Card>) {
    this.cardArray = cards;
  }

  size(): number {
    return this.cardArray.length;
  }

  isEmpty(): boolean {
    return this.cardArray.length === 0;
  }

  isNotEmpty(): boolean {
    return !this.isEmpty();
  }

  peek(): Card {
    if (this.isEmpty()) {
      throw new Error("Deck is empty");
    }
    return this.cardArray[0];
  }

  cards(): Array<Card> {
    return new Array<Card>(...this.cardArray);
  }

  draws(nrOfCards: number): [Deck, Deck] {
    if (this.size() < nrOfCards) {
      throw new Error(`Deck too small to draw ${nrOfCards} cards`);
    }
    return [
      new Deck(this.cardArray.slice(0, nrOfCards)),
      new Deck(this.cardArray.slice(nrOfCards)),
    ];
  }

  addCardOnTop(card: Card): Deck {
    const newCards: Array<Card> = [card, ...this.cards()];
    return new Deck(newCards);
  }
}
