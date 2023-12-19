/*
const gameState = {
  companyValues: {
    companyId: companyShareValue,
  },
  userState: {
    userId: {
      cashInHand: cashValue,
      holdings: {
        companyId: holdingsInthisCompany,
      },
      cardsHeld:[card1, card2]
    },
  },
  currentMegaRound: 0,
  currentSubRound: 0,
  totalMegaRounds,
};
*/

export const Companies = [
  { id: 1, name: "Tata", startingPrice: 35, maxCardVal: 15 },
  { id: 2, name: "ONGC", startingPrice: 40, maxCardVal: 15 },
  { id: 3, name: "Reliance", startingPrice: 50, maxCardVal: 20 },
  { id: 4, name: "Infosys", startingPrice: 55, maxCardVal: 20 },
  { id: 5, name: "SBI", startingPrice: 60, maxCardVal: 20 },
  { id: 6, name: "Reliance Industries", startingPrice: 80, maxCardVal: 25 },
  { id: 7, name: "Nifty", startingPrice: 120, maxCardVal: 30 },
];

export function initializeGameState(noOfPlayers, totalMegaRounds = 10) {
  const gameState = {
    companyValues: {},
    userState: {},
    currentMegaRound: 0,
    currentSubRound: 0,
    totalMegaRounds,
    noOfPlayers,
  };

  Companies.forEach((company) => {
    gameState.companyValues[company.id] = company.startingPrice;
  });

  for (let i = 0; i < noOfPlayers; i++) {
    gameState.userState[i] = {
      cashInHand: 800000,
      holdings: {},
      cardsHeld: [],
    };
    Companies.forEach((company) => {
      gameState.userState[i].holdings[company.id] = 0;
    });
  }

  return gameState;
}

export function findWinner(gameState) {
  const highestValue = 0;
  const winnerId = null;

  for (let playerId = 0; playerId < gameState.noOfPlayers; playerId++) {
    let totalWorth = gameState.userState[playerId].cashInHand;

    Companies.forEach((company) => {
      totalWorth +=
        gameState.companyValues[company.id] *
        gameState.userState[playerId].holdings[company.id];
    });

    if (totalWorth > highestValue) {
      highestValue = totalWorth;
      winnerId = playerId;
    }
  }

  return winnerId;
}

export function getCardStack() {
  const Cards = [];

  Companies.forEach(function (company) {
    for (let i = 5; i <= company.maxCardVal; i += 5) {
      Cards.push({
        type: "NORMAL",
        companyId: company.id,
        netChange: i,
      });
      Cards.push({
        type: "NORMAL",
        companyId: company.id,
        netChange: i,
      });
    }

    for (let i = -5; i >= -company.maxCardVal; i -= 5) {
      Cards.push({
        type: "NORMAL",
        companyId: company.id,
        netChange: i,
      });
      Cards.push({
        type: "NORMAL",
        companyId: company.id,
        netChange: i,
      });
    }
  });

  const CrystalCards = [
    { type: "CRYSTAL", crystalType: "FRAUD" },
    { type: "CRYSTAL", crystalType: "DIVIDEND" },
    { type: "CRYSTAL", crystalType: "BONUS_SHARE" },
    { type: "CRYSTAL", crystalType: "RIGHT_ISSUE" },
    { type: "CRYSTAL", crystalType: "LOAN_ON_STOCK" },
  ];

  CrystalCards.forEach((card) => {
    Cards.push(card);
    Cards.push(card);
  });

  const circuitDenomination = [5, 10, 20];

  circuitDenomination.forEach((denom) => {
    Cards.push({
      type: "CIRCUIT",
      circuitType: "UP",
      denomination: denom,
    });
    Cards.push({
      type: "CIRCUIT",
      circuitType: "LOW",
      denomination: denom,
    });
  });

  return Cards;
}

export function applyCard(
  initial,
  final,
  card,
  userId,
  companyId = null,
  amountSpent = null
) {
  const copy = JSON.parse(JSON.stringify(final));

  switch (card.type) {
    case "NORMAL": {
      copy.companyValues[card.companyId] += card.netChange;
      return copy;
    }
    case "CIRCUIT": {
      switch (card.circuitType) {
        case "UP": {
          copy.companyValues[companyId] = Math.min(
            final.companyValues[companyId],
            initial.companyValues[companyId] + card.denomination
          );
          return copy;
        }
        case "LOW": {
          copy.companyValues[companyId] = Math.max(
            final.companyValues[companyId],
            initial.companyValues[companyId] - card.denomination
          );
          return copy;
        }
        default: {
          throw new Error("Circuit type not identified");
        }
      }
    }
    case "CRYSTAL": {
      switch (card.crystalType) {
        case "FRAUD": {
          if (amountSpent < final.userState[userId].cashInHand) {
            copy.userState[userId].cashInHand -= amountSpent;
            copy.userState[userId].holdings[companyId] +=
              (amountSpent * 2) / final.companyValues[companyId];
          }
          return copy;
        }
        case "DIVIDEND": {
          copy.userState[userId].cashInHand +=
            final.userState[userId].holdings[companyId] * 5;
          return copy;
        }
        case "BONUS_SHARE": {
          copy.userState[userId].holdings[companyId] +=
            Math.round(final.userState[userId].holdings[companyId] / 5000) *
            1000;
          return copy;
        }
        case "RIGHT_ISSUE": {
          const noOfStocks =
            Math.round(final.userState[userId].holdings[companyId] / 2000) *
            1000;

          if (copy.userState[userId].cashInHand >= 10 * noOfStocks) {
            copy.userState[userId].cashInHand -= 10 * noOfStocks;
            copy.userState[userId].holdings[companyId] += noOfStocks;
          }
          return copy;
        }
        case "LOAN_ON_STOCK": {
          copy.userState[userId].cashInHand += 100000;
          return copy;
        }
        default: {
          throw new Error("Crystal type not identified");
        }
      }
    }
    default: {
      throw new Error("Card type not identified");
    }
  }
}

export function getShuffledCards(rounds = 3) {
  const cards = getCardStack();
  const length = cards.length;

  for (let j = 0; j < rounds; j++) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * length);

      const temp = cards[i];
      cards[i] = cards[randomIndex];
      cards[randomIndex] = temp;
    }
  }
  return cards;
}

export function distributeCardsTo(noOfPlayers = 6) {
  const shuffledCards = getShuffledCards();

  const initialObj = {};
  for (let i = 0; i < noOfPlayers; i++) initialObj[i] = [];

  const distributedCards = shuffledCards
    .slice(0, noOfPlayers * 10)
    .reduce((acc, cur, i) => {
      acc[i % noOfPlayers].push(cur);
      return acc;
    }, initialObj);

  return distributedCards;
}
