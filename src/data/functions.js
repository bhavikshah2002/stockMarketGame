//companyValues=[{id:1, currRate:200},{id:2, currRate:400}]
//stockHoldings=[{id:1, stocksQty:12},{id:2, stocksQty:0}]
function calculateHoldingsValue(companyValues, stockHoldings){
    let holdingsValue = 0
    for(let i=0;i<companyValues.length;i++){
      holdingsValue+=stockHoldings[i].stocksQty*companyValues[i].currRate
    }
    return holdingsValue
  }
  
  //companyValues=[{id:1, currRate:200},{id:2, currRate:400}]
  //stockHoldings=[{id:1, stocksQty:12},{id:2, stocksQty:0}]
  //cashInHand=12000
  function calculateTotalValue(companyValues, stockHoldings, cashInHand) {
    let holdingsValue = 0
    for(let i=0;i<companyValues.length;i++){
      holdingsValue+=stockHoldings[i].stocksQty*companyValues[i].currRate
    }
    return holdingsValue+cashInHand
  }
  //stockValue=12
  //cashInHand=13455
  function calculatePurchasableStocks(stockValue, cashInHand) {
    let purchasableStocksQty=0
    if (stockValue<cashInHand)
    {
      purchasableStocksQty=Math.floor(cashInHand/(stockValue*1000))*1000
    }
    return purchasableStocksQty;
  }
  