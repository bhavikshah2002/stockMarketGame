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
  {
    id: 1,
    name: "Tata",
    startingPrice: 35,
    maxCardVal: 15,
    photoUrl: require("../../assets/images/companies/tata.png"),
  },
  {
    id: 2,
    name: "ONGC",
    startingPrice: 40,
    maxCardVal: 15,
    photoUrl: require("../../assets/images/companies/ongc.png"),
  },
  {
    id: 3,
    name: "Reliance",
    startingPrice: 50,
    maxCardVal: 20,
    photoUrl: require("../../assets/images/companies/reliance.png"),
  },
  {
    id: 4,
    name: "Infosys",
    startingPrice: 55,
    maxCardVal: 20,
    photoUrl: require("../../assets/images/companies/infosys.png"),
  },
  {
    id: 5,
    name: "SBI",
    startingPrice: 60,
    maxCardVal: 20,
    photoUrl: require("../../assets/images/companies/sbi.png"),
  },
  {
    id: 6,
    name: "Adani",
    startingPrice: 80,
    maxCardVal: 25,
    photoUrl: require("../../assets/images/companies/adani.png"),
  },
  {
    id: 7,
    name: "Nifty",
    startingPrice: 120,
    maxCardVal: 30,
    photoUrl: require("../../assets/images/companies/nifty.png"),
  },
];

export const CompanyInObj = Companies.reduce((acc, crr) => {
  acc[crr.id] = crr;
  return acc;
}, {});
