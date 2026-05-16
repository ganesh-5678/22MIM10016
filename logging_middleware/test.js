const { Log } = require('./logger');

async function test() {
  const result = await Log("frontend", "info", "utils", "Testing logger setup");
  console.log("Result:", result);
}

test();