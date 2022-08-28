let orderFunctional = require("../helpers/functionals/order.functional")


const itemCollections = [
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

function main(){
  let orderedItems = [{
    item:"poke ball",
    qty:2
  }]
  let orderedItemNames = orderFunctional.getItemNames(orderedItems)
  let purchasedItems = orderFunctional.getOrderedItems(orderedItemNames,itemCollections)
  let priceDictionary = orderFunctional.priceDictionary(purchasedItems)
  let orderedItemAndPrice = orderFunctional.mapOrderedItemAndPrice(orderedItems,priceDictionary)
  let itemWithSubtotal = orderFunctional.calculateSubtotalByValueAndQty(orderedItemAndPrice)
  let grandTotal = orderFunctional.sum(itemWithSubtotal)
  console.log(grandTotal)
  console.log(itemWithSubtotal)
}

main()