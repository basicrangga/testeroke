module.exports =  class ItemHelper {
  static getOrderedItems(searchItemName=[],allItems=[]){
    return allItems.filter(row=>searchItemName.includes(row.itemName) && row.itemCategoryNames=="items")
  }
  static priceDictionary(purchasedItems){
    let priceDictionary = {}
    purchasedItems.map(row=>{
      let itemName = row.itemName
      priceDictionary[itemName] = row.value
      return row
    })
    return priceDictionary
  }
}