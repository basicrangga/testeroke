const supertest = require("supertest")
const BASEURL = "localhost:3000"

module.exports = class RequestWrapper{
  static request(baseUrl){
    return supertest(baseUrl)
  }
  static async get(url){
    let response = await this.request(BASEURL).get(url)
    return this.dataResponse(response)
  }
  static dataResponse(response){
    return response.body
  }
}