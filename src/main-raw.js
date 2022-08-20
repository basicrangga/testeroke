// https://screenrant.com/pokemon-dollars-real-life-money-how-much/
const listPrices = [
  {
    itemCategoryNames:"items",
    itemName: 'poke ball',
    value: 200,
  },
  {
    itemCategoryNames:"items",
    itemName: 'hyper potion',
    value: 1500
  },
  {
    itemCategoryNames:"items",
    itemName: 'revive',
    value: 2000
  },
  {
    itemCategoryNames:"tax",
    itemName: 'purchase tax',
    value: 10
  }
]

const promoCollections = [
  {
    code:"ITSPIKACHU",
    promoType:"percentage",
    value:29
  },
  {
    code:"CATCHTHEMALL",
    promoType:"amount",
    value:50
  }
]

function calculateCart(items,promoCode=""){

  let allItemNames = items.map(row=>row.item)
  // get ordered items
  let purchasedItems = listPrices
  .filter(row=>allItemNames.includes(row.itemName) && row.itemCategoryNames=="items")
  
  // validate that ordered items is available
  if(purchasedItems.length!=allItemNames.length){
    throw "some item(s) is not found."
  }
  
  // build dictionary for easier price access
  let priceDictionary = {}
  purchasedItems.map(row=>{
    let itemName = row.itemName
    priceDictionary[itemName] = row.value
  })

  // map ordered item value
  let purchaseList = items.map(row=>{
    let itemName = row.item
    let itemValue = (priceDictionary[itemName]) ? priceDictionary[itemName] : 0
    row.value = itemValue
    return row
  })

  // calculate item subtotal
  let purchaseSubTotal = purchaseList.map(row=>{
    row.subTotal = row.value * row.qty
    return row
  })
  // calculate order grand total
  let purchaseBeforeTaxGrandTotal = purchaseSubTotal.map(row=>row.subTotal).reduce((a,b)=>a+b)

  // calculate tax
  let taxes = listPrices.filter(row=>row.itemCategoryNames=="tax")
  // create tax row for details
  // calculate tax values
  let taxValues = taxes.map(row=>{
    let {itemName,value:itemValueAsQty} = row
    let taxValue = itemValueAsQty/100*purchaseBeforeTaxGrandTotal

    return {
      item:itemName,
      qty:itemValueAsQty,
      value:taxValue,
      subTotal:taxValue
    }
  })

  let taxTotal = taxValues.map(row=>row.subTotal).reduce((a,b)=>a+b,0)
  // add tax rows to details
  if(taxTotal){
    purchaseSubTotal = [
      ...purchaseSubTotal,
      ...taxValues
    ]
  }

  // calculate grandTotalAfterTax
  let grandTotalAfterTax = purchaseSubTotal.map(row=>row.subTotal).reduce((a,b)=>a+b)
  
  // apply promo code
  let promoApplied = 0
  if(promoCode){ 
    let validPromo = promoCollections.filter(row=>row.code==promoCode)
    if(!validPromo.length){
      throw "invalid promo code"
    }
    let firstPromoMatch = validPromo[0]
    let {
      code:matchPromoCode,
      promoType="",
      value:promoValue
    } = firstPromoMatch
    // promo method based on type
    switch (promoType) {
      case "percentage":
        promoApplied = purchaseBeforeTaxGrandTotal*promoValue/100
        break;
      case "amount":
      default:
        promoApplied = promoValue
        break;
    }
    // add promo in details
    purchaseSubTotal.push({
      item:`promo ${matchPromoCode}`,
      qty:1,
      value:promoApplied,
      subTotal:promoApplied
    })
  }
  let grandTotalAfterPromo = grandTotalAfterTax-promoApplied
  
  let calculatedCart = {
    details:purchaseSubTotal,
    grandTotal:grandTotalAfterPromo
  }

  return calculatedCart
}

let cartValues = calculateCart([
  {item:"poke ball",qty:3},
  {item:"hyper potion",qty:1},
  {item:"revive",qty:1},
],"ITSPIKACHU")

console.log(cartValues)