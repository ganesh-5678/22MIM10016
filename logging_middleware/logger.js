const fetch = require('node-fetch');

const CLIENT_ID = "ceb1b491-9f6c-439c-9b97-b2c0f12ee1c2";
const CLIENT_SECRET = "qHZDjcDEGQMBnseM";

let ACCESS_TOKEN = "";

async function getToken() {
  const response = await fetch("http://4.224.186.213/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "ganeshbojanapu2022@vitbhopal.ac.in",
      name: "BOJANAPU GANESH",
      rollNo: "22MIM10016",
      accessCode: "SfFuWg",
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET
    })
  });
  const data = await response.json();
  ACCESS_TOKEN = data.access_token;
}

async function Log(stack, level, pkg, message) {
  try {
    if (!ACCESS_TOKEN) await getToken();
    const response = await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error:", err);
  }
}

module.exports = { Log };