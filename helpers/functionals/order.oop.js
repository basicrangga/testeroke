class Math{
  sum(array){
    return array.reduce((a,b)=>a+b,0)
  }
}

class OrderItems extends Math{
  constructor(selectedItems,itemCollections){
    super()
    this.selectedItems = selectedItems
    this.itemCollections = itemCollections
    this.priceDictionary = {}
    this.orderedItems = []
  }
  getSelectedItems(){
    return this.selectedItems
  }
  setItemCollection(itemCollections){
    this.itemCollections = itemCollections
    return this 
  }
  getItemCollection(){
    return this.itemCollections
  }
  selectedItemNames(){
    let items = this.getSelectedItems()
    return items.map(row=>{
      return row.item
    })
  }
  filterOrderedItems(){
    let selectedItems = this.selectedItemNames()
    let itemCollections = this.getItemCollection()
    let orderedItems = itemCollections.filter(row=>{
      return selectedItems.includes(row.itemName)
    })
    this.orderedItems = orderedItems
    return this
  }
  getOrderedItems(){
    return this.orderedItems
  }
  buildPriceDictionary(){
    let orderedItems = this.getOrderedItems()
    let priceDictionary = {}
    orderedItems.map(row=>{
      let itemName = row.itemName
      priceDictionary[itemName] = row.value
      return row
    })
    this.priceDictionary = priceDictionary
    return this
  }
  getPriceDictionary(){
    return this.priceDictionary
  }
}

class Order extends OrderItems{
  constructor(selectedItems,itemCollections){
    super(selectedItems,itemCollections)
  }
  mapOrderedItemAndPrice(){
    let selectedItems = this.getSelectedItems()
    let priceDictionary = this.getPriceDictionary()
    let mapedItems = selectedItems.map(row=>{
      let itemName = row.item
      let itemValue = (priceDictionary[itemName]) ? priceDictionary[itemName] : 0
      row.value = itemValue
      return row
    })
    this.orderedItemAndPrice = mapedItems
    return this
  }
  getOrderedItemAndPrice(){
    return this.orderedItemAndPrice
  }
  calculateSubtotalByValueAndQty(){
    let purchasedItems = this.getOrderedItemAndPrice()
    let calculatedItems = purchasedItems.map(row=>{
      row.subTotal = row.value * row.qty
      return row
    })
    this.calculatedItems = calculatedItems
    return this
  }
  getCalculatedItems(){
    return this.calculatedItems
  }
  itemGrandTotal(){
    let calculatedItems = this.getCalculatedItems() 
    let subTotalArray = calculatedItems.map(row=>row.subTotal)
    return this.sum(subTotalArray)
  }
}


module.exports = {
  Order,OrderItems,Math
}