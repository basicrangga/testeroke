module.exports = class MathHelper {
  static sum(array){
    return array.reduce((a,b)=>a+b,0)
  }
}