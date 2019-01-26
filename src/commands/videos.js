'use strict';

const app = require('../settings/app');

app.bot.on("video", function(msg) {
    
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;

    const flavio = "flavio";
    if (msg.text.toString().toLowerCase().includes(flavio)) {
        app.bot.sendVideoNote(chatId, "../files/videos/flavio.mp4");
    }
});