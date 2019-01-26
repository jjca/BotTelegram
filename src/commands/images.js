'use strict';

const app = require('../settings/app');

app.bot.on("message", function(msg) {

    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;
    
    const sebin = "sebin";
    if (msg.text.toString().toLowerCase().includes(sebin)) {
        app.bot.sendPhoto(chatId, "../files/images/sebin.jpg");
    }

    const dtdm = "este bot dominará al mundo";
    if (msg.text.toString().toLowerCase().includes(dtdm)) {
        app.bot.sendPhoto(chatId, "../files/images/dominiototaldelmundo.jpg");
    }
});