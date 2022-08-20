module.exports =  class TaxHelper {
  static getTaxRows(listPrices=[]){
    return listPrices.filter(row=>row.itemCategoryNames=="tax")
  }
  static calculateTaxValues(taxes=[],purchaseBeforeTaxGrandTotal=0){
    return taxes.map(row=>{
      let {itemName,value:itemValueAsQty} = row
      let taxValue = itemValueAsQty/100*purchaseBeforeTaxGrandTotal
  
      return {
        item:itemName,
        qty:itemValueAsQty,
        value:taxValue,
        subTotal:taxValue
      }
    })
  }
}