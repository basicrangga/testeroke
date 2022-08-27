const requestWrapper = require("../cores/request-wrapper")

describe('Pokemon index', () => {
  const path = "/pokemons"
  
  it('should return succees http response',(done)=>{
    requestWrapper
      .request()
      .get(path)
      .expect(200,done)
  });

  it('should have (previous,result) structre keys',async()=>{
    let responseData = await requestWrapper.get(path)
    let keys = Object.keys(responseData)
    
    expect(keys).toEqual(
      expect.arrayContaining(["results","previous"])
    )
    expect(keys).toHaveLength(2)
  });

  it.only('should have (name,url) item keys',async()=>{
    let responseData = await requestWrapper.get(path)
    let dataResult = responseData.results
    expect(dataResult.length).toBeGreaterThan(0)

    let firstResult = dataResult[0]
    let keys = Object.keys(firstResult)
    expect(keys).toEqual(
      expect.arrayContaining(["name","url"])
    )
  });
});