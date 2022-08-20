module.exports =  class PromoHelper {
  static getFirstPromoByCode(promoCode="",promoCollections=[]){
    let promoMatch = promoCollections.filter(row=>row.code==promoCode)
    return promoMatch.shift()
  }
  static calculatePromo(grandTotal=0,firstPromoMatch){
    let promoApplied = 0
    if(!grandTotal) return promoApplied
    if(!firstPromoMatch) return promoApplied
    
    let {
      promoType="",
      value:promoValue
    } = firstPromoMatch
    // promo method based on type
    switch (promoType) {
      case "percentage":
        promoApplied = grandTotal*promoValue/100
        break;
      case "amount":
      default:
        promoApplied = promoValue
        break;
    }

    return promoApplied
  }
}