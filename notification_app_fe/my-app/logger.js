export async function Log(stack, level, pkg, message) {
  try {
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
    await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
  } catch (err) {}
}