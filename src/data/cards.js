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

export const CardMessages = {
  up: [
    "Company's earnings beat expectations, driving stock up!",
    "Investor confidence surges on strong quarterly results!",
    "Innovation sparks a surge in stock value!",
    "Market demand skyrockets, pushing shares higher!",
    "Strategic acquisition leads to a significant stock boost!",
    "Company outperforms industry peers, lifting shares!",
    "Positive economic indicators fuel stock rally!",
    "Record-breaking sales propel shares to new heights!",
    "Excitement builds around new product launch, boosting stock!",
    "Market analysts upgrade outlook, driving up stock!",
    "Company expands into lucrative markets, driving growth!",
    "Investor optimism fuels a surge in share price!",
    "Earnings exceed estimates, leading to a stock surge!",
    "Global expansion plans drive stock value higher!",
    "Customer satisfaction drives investor confidence!",
    "Industry recognition elevates company's position!",
    "Breakthrough technology announcement boosts stock!",
    "Strong leadership drives a surge in stock price!",
    "Company surpasses revenue targets, pleasing investors!",
    "Market sentiment turns bullish on company's prospects!",
    "Strategic partnership announcement lifts stock price!",
    "Prestigious industry award boosts investor confidence!",
    "Innovative product launch generates investor interest!",
    "New contract win increases shareholder value!",
    "Dividend increase announcement delights investors!",
    "Company acquires lucrative new contract!",
    "Innovation sparks investor excitement!",
    "Record-breaking sales drive up stock value!",
    "Economic forecast favors company growth!",
    "Positive earnings report boosts investor confidence!",
  ],
  low: [
    "Company reports unexpected loss, alarming investors!",
    "Market downturn erodes confidence, dragging stock down!",
    "Legal issues weigh heavily on share price!",
    "Product recall devastates investor sentiment!",
    "Revenue falls short of expectations, causing stock decline!",
    "Economic uncertainty triggers a sharp decline in stock!",
    "Leadership shake-up leads to a steep drop in stock price!",
    "Industry disruption hits company's stock negatively!",
    "Global supply chain disruptions impact shares negatively!",
    "Profit warning sparks investor panic, driving sell-off!",
    "Failed product launch disappoints shareholders!",
    "Competitor gains market share, hurting stock value!",
    "Regulatory challenges drag down stock price!",
    "Company downsizing shakes investor confidence!",
    "Customer backlash leads to a significant drop in stock!",
    "Strategic misstep leads to a decline in stock value!",
    "Analyst downgrade sends stock into a downward spiral!",
    "Market volatility triggers widespread investor panic!",
    "Credit rating downgrade impacts shares negatively!",
    "Supply chain disruption leads to a drop in stock value!",
    "Failed merger talks deflate investor optimism!",
    "Industry downturn weighs heavily on company's stock!",
    "Rising costs squeeze company profits, leading to a stock drop!",
    "Threat of litigation drags down stock price!",
    "Investor sentiment turns bearish on company's prospects!",
    "Profit warning sends stock plummeting!",
    "Economic uncertainty weighs on investor confidence!",
    "Legal challenges impact company stock negatively!",
    "Revenue misses expectations, lowering share price!",
    "Product recall dampens investor sentiment!",
  ],
};

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
