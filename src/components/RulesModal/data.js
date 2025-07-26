export const SampleCards = [
  {
    type: "CRYSTAL",
    crystalType: "DIVIDEND",
    id: 112,
  },
  {
    type: "NORMAL",
    companyId: 1,
    netChange: 15,
    id: 6,
  },
  {
    type: "CIRCUIT",
    circuitType: "LOW",
    denomination: 10,
    id: 114,
  },
];

export const SampleCompanyCards = [
  {
    type: "NORMAL",
    companyId: 7,
    netChange: 30,
    id: 45,
  },
  {
    type: "NORMAL",
    companyId: 7,
    netChange: -30,
    id: 45,
  },
];

export const SampleCircuitCards = [
  {
    type: "CIRCUIT",
    circuitType: "UP",
    denomination: 15,
    id: 114,
  },
  {
    type: "CIRCUIT",
    circuitType: "LOW",
    denomination: 5,
    id: 114,
  },
];

export const SampleCrystalCards = [
  { type: "CRYSTAL", crystalType: "FRAUD", id: 1 },
  { type: "CRYSTAL", crystalType: "DIVIDEND", id: 2 },
  {
    type: "CRYSTAL",
    crystalType: "BONUS_SHARE",
    id: 3,
  },
  {
    type: "CRYSTAL",
    crystalType: "RIGHT_ISSUE",
    id: 4,
  },
  {
    type: "CRYSTAL",
    crystalType: "LOAN_ON_STOCK",
    id: 5,
  },
];

export const CrystalTypes = [
  {
    type: "LOAN ON STOCK",
    desc: "Players receive a cash bonus of ₹1,00,000/-",
  },
  {
    type: "DIVIDEND",
    desc: "Players receive a dividend of ₹5/- per share for any company.",
  },
  {
    type: "RIGHT ISSUE",
    desc: "Players can buy one additional share for every two shares held in the company at a price of ₹10/- per share.",
  },
  {
    type: "BONUS SHARE",
    desc: "Players receive one additional share for every five shares held in the company for free.",
  },
  {
    type: "FRAUD",
    desc: "Players can buy stocks of any company at a price which is 70% of the market price.",
  },
];
