const orderHelper = require("./helpers/order-helper")
const itemHelper = require('./helpers/item-helper')
const mathHelper = require("./helpers/math-helper")
const taxHelper = require("./helpers/tax-helper")
const promoHelper = require("./helpers/promo-helper")
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

function calculateCart(items=[],promoCode=""){
  //calculate items price
  let allItemNames = orderHelper.getItemNames(items)
  let purchasedItems = itemHelper.getOrderedItems(allItemNames,listPrices)
  
  orderHelper.isAllItemAvailable(allItemNames,purchasedItems)
  let priceDictionary = itemHelper.priceDictionary(purchasedItems)
  let purchaseList = orderHelper.mapOrderedItemAndPrice(items,priceDictionary)
  let purchaseSubTotal = orderHelper.calculateSubtotalByValueAndQty(purchaseList)
  //get grand totals
  let purchaseTotalBeforeTaxGrandTotal = mathHelper.sum(purchaseSubTotal.map(row=>row.subTotal))

  //calculate tax value
  let taxes = taxHelper.getTaxRows(listPrices)
  let taxValues = taxHelper.calculateTaxValues(taxes,purchaseTotalBeforeTaxGrandTotal)
  let taxTotal = mathHelper.sum(taxValues.map(row=>row.subTotal))
  //prepare tax details
  if(taxTotal){
    purchaseSubTotal = [
      ...purchaseSubTotal,
      ...taxValues
    ]
  }
  let grandTotalAfterTax = mathHelper.sum(purchaseSubTotal.map(row=>row.subTotal))
  
  let promoApplied = 0
  if(promoCode){
    let firstPromoMatch = promoHelper.getFirstPromoByCode(promoCode,promoCollections)
    orderHelper.validatePromo(firstPromoMatch)
    promoApplied = promoHelper.calculatePromo(purchaseTotalBeforeTaxGrandTotal,firstPromoMatch)
    
    if(promoApplied){
      let promoRow = orderHelper.promoDetailRow(firstPromoMatch.code,promoApplied)
      purchaseSubTotal.push(promoRow)
    }
  }
  
  let grandTotalAfterPromo = grandTotalAfterTax-promoApplied
  //calculate promo value
  //prepare promo details
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