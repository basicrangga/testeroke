module.exports = class OrderHelper {
  static getItemNames(orderArray=[]){
    return orderArray.map(row=>row.item)
  }
  static isAllItemAvailable(allItemNames,purchasedItems){
    if(allItemNames.length!=purchasedItems.length){
      throw "some item(s) is not found."
    }
    return true
  }
  static mapOrderedItemAndPrice(items=[],priceDictionary={}){
    return items.map(row=>{
      let itemName = row.item
      let itemValue = (priceDictionary[itemName]) ? priceDictionary[itemName] : 0
      row.value = itemValue
      return row
    })
  }
  static calculateSubtotalByValueAndQty(purchaseList){
    return purchaseList.map(row=>{
      row.subTotal = row.value * row.qty
      return row
    })
  }
  static validatePromo(matchedPromo){
    if(!matchedPromo){
      throw "invalid promo code"
    }
    return true
  }
  static promoDetailRow(promoCode,promoValue){
    return {
      item:`promo ${promoCode}`,
      qty:1,
      value:promoValue,
      subTotal:promoValue
    }
  }
}