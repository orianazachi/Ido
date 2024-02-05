import 'dotenv/config'

let Discord = require("discord.js");
const keep_alive = require('./keep_alive.js')
let client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity("ענייני שווארמות", { type: "WATCHING" });
});

let awaitingResponse = false;

client.on("message", (message) => {
  if (message.author.bot) return;

  if (message.mentions.users.has(client.user.id)) {
    if (message.content.toLowerCase().includes("אני רעב")) {
      message.channel.send("אה אחי כמה כסף יש לך");
      awaitingResponse = true;
    } else if (awaitingResponse && !isNaN(message.content) && parseInt(message.content) > 0) {
      const money = parseInt(message.content);

      message.channel.send(`אז אתה יכול לקנות ${money / 60} לאפה שווארמות`);
      message.channel.send(`או אתה יכול לקנות ${money / 50} פיתה שווארמות`);
      awaitingResponse = false;
    }
  }
});

client.login(process.env.TOKEN);
