'use strict';

const app = require('../settings/app');

app.bot.on("message", function(msg) {
    
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;

    const flavio = "flavio";
    if (msg.text.toString().toLowerCase().includes(flavio)) {
        app.bot.sendVideoNote(chatId, "./src/files/videos/flavio.mp4");
    }

    const meperdonas = "me perdonas";
    if (msg.text.toString().toLowerCase().includes(meperdonas)) {
        app.bot.sendVideoNote(chatId, "./src/files/videos/meperdonas.mp4");
    }
});