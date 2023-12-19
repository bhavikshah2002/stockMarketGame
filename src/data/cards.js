const Companies = [
  { id: 1, name: "Tata", startingPrice: 35, maxCardVal: 15 },
  { id: 2, name: "ONGC", startingPrice: 40, maxCardVal: 15 },
  { id: 3, name: "Reliance", startingPrice: 50, maxCardVal: 20 },
  { id: 4, name: "Infosys", startingPrice: 55, maxCardVal: 20 },
  { id: 5, name: "SBI", startingPrice: 60, maxCardVal: 20 },
  { id: 6, name: "Reliance Industries", startingPrice: 80, maxCardVal: 25 },
  { id: 7, name: "Nifty", startingPrice: 120, maxCardVal: 30 },
];

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

const gameState = {
  comapnyValues: {
    companyId: companyShareValue,
  },
  userState: {
    userId: {
      cashInHand: cashValue,
      holdings: {
        companyId: holdingsInthisCompany,
      },
    },
  },
};



function applyCard(initial, final, card, userId, comapnyId = null, amountSpent = null) {
  switch (card.type) {
    case "NORMAL": {
      final.comapnyValues[card.companyId] += card.netChange;
      return final;
    }
    case "CIRCUIT": {
      switch (card.circuitType) {
        case "UP": {
          final.comapnyValues[comapnyId] = Math.min(
            final.comapnyValues[comapnyId],
            initial.comapnyValues[comapnyId] + card.denomination
          );
          return final;
        }
        case "LOW": {
          final.comapnyValues[comapnyId] = Math.max(
            final.comapnyValues[comapnyId],
            initial.comapnyValues[comapnyId] - card.denomination
          );
          return final;
        }
      }
    }
    case "CRYSTAL": {
      switch (card.crystalType) {
        case "FRAUD": {
          if (amountSpent<final.userState[userId].cashInHand){
          final.userState[userId].cashInHand-=amountSpent
          final.userState[userId].holdings[companyId]+=amountSpent*2/final.comapnyValues[comapnyId]
          }
          return final;
        }
        case "DIVIDEND": {
          final.userState[userId].cashInHand+=final.userState[userId].holdings[companyId]*5
          return final;
        }
        case "BONUS_SHARE": {
          final.userState[userId].holdings[companyId]+=Math.round(final.userState[userId].holdings[companyId]/5000)*1000
          return final;
        }
        case "RIGHT_ISSUE": {
          final.userState[userId].cashInHand-=10*Math.round(final.userState[userId].holdings[companyId]/2000)*1000
          final.userState[userId].holdings[companyId]+=Math.round(final.userState[userId].holdings[companyId]/2000)*1000
          return final;
        }
        case "LOAN_ON_STOCK": {
          final.userState[userId].cashInHand+=100000
          return final;
        }
      }
    }
  }
}

console.log(Cards);
