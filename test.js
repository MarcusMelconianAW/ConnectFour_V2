const server = require('./server');

describe("Connect Four: testScoreBoardData", () => {
    it("Test scoreboard data is being sent to database", async () => {
      
      let promise = new Promise(function(resolve, reject) {
        server.testScoreBoardData(0, 6)
      });
      
      promise.then(
        result => expect(result).toBe('Database API call complete')
      );

    })
})

describe("Connect Four: ScoreBoardData", () => {
  it("Test correct scoreboard data is stored and received back from database", async () => {
    
    let promise = new Promise(function(resolve, reject) {
      server.validateScoreBoardData();
    });
    
    promise.then(
      result => expect(result).toBe([0, 6])
    );

  })
})