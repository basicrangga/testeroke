const {Order} = require("../helpers/functionals/order.oop")

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
  
  const orderCart = new Order(orderedItems,itemCollections)
  let grandTotal = orderCart
    .filterOrderedItems()
    .buildPriceDictionary()
    .mapOrderedItemAndPrice()
    .calculateSubtotalByValueAndQty()
    .itemGrandTotal()

  console.log(grandTotal)
  console.log(orderCart.getCalculatedItems())
  
}

main()