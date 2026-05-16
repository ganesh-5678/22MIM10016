const fetch = require('node-fetch');
const { Log } = require('../logging_middleware/logger');

async function getTopNotifications(n = 10) {
  await Log("backend", "info", "service", "Fetching notifications from API");
  
  const authRes = await fetch("http://4.224.186.213/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "ganeshbojanapu2022@vitbhopal.ac.in",
      name: "BOJANAPU GANESH",
      rollNo: "22MIM10016",
      accessCode: "SfFuWg",
      clientID: "ceb1b491-9f6c-439c-9b97-b2c0f12ee1c2",
      clientSecret: "qHZDjcDEGQMBnseM"
    })
  });
  const authData = await authRes.json();
  const token = authData.access_token;

  const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  const data = await response.json();
  const notifications = data.notifications;
  
  await Log("backend", "info", "service", `Fetched ${notifications.length} notifications`);

  const weight = { "Placement": 3, "Result": 2, "Event": 1 };

  const sorted = notifications.sort((a, b) => {
    if (weight[b.Type] !== weight[a.Type]) return weight[b.Type] - weight[a.Type];
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  const topN = sorted.slice(0, n);

  await Log("backend", "info", "service", `Top ${n} notifications selected`);

  console.log(`\n=== TOP ${n} PRIORITY NOTIFICATIONS ===\n`);
  topN.forEach((notif, index) => {
    console.log(`${index + 1}. [${notif.Type}] ${notif.Message} — ${notif.Timestamp}`);
  });

  return topN;
}

getTopNotifications(10);