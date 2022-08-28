module.exports = {
  getItemNames(orderArray=[]){
    return orderArray.map(row=>row.item)
  },
  getOrderedItems(searchItemName=[],allItems=[]){
    return allItems.filter(row=>searchItemName.includes(row.itemName) && row.itemCategoryNames=="items")
  },
  priceDictionary(purchasedItems){
    let priceDictionary = {}
    purchasedItems.map(row=>{
      let itemName = row.itemName
      priceDictionary[itemName] = row.value
      return row
    })
    return priceDictionary
  },
  mapOrderedItemAndPrice(items=[],priceDictionary={}){
    return items.map(row=>{
      let itemName = row.item
      let itemValue = (priceDictionary[itemName]) ? priceDictionary[itemName] : 0
      row.value = itemValue
      return row
    })
  },
  calculateSubtotalByValueAndQty(purchaseList){
    return purchaseList.map(row=>{
      row.subTotal = row.value * row.qty
      return row
    })
  },
  sum(calculatedSubTotal){
    return calculatedSubTotal.map(row=>{
      return row.subTotal
    }).reduce((a,b)=>a+b,0)
  }
}