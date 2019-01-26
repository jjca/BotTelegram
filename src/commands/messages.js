'use strict';

const app = require('../settings/app');

app.bot.on("message", function(msg) {
    
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;
    
    const cdlm = "coño de la madre";
    if (msg.text.toString().toLowerCase().includes(cdlm)) {
        app.bot.sendMessage(chatId, fromName + ", Maduro te ama.");
    }

    const mmgv = ["mamaguevo", "mamaguebo", "mamahuevo"];
    if (msg.text.toString().toLowerCase().includes(mmgv[0]) || msg.text.toString().toLowerCase().includes(mmgv[1]) || msg.text.toString().toLowerCase().includes(mmgv[2])) {
        app.bot.sendMessage(chatId, fromName + ", ¡NIÑ@!, ¿Con esa boca besas a tú mamá?");
    }

    const digalo = ["digalo ahí nalat", "digalo ahi nalat", "dígalo ahí nalat", "dígalo ahi nalat"];
    if (msg.text.toString().toLowerCase().indexOf(digalo[0]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[1]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[2]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[3]) === 0) {
        app.bot.sendMessage(chatId, "Sisa manauresaurio.");
    }

    const shutup = ["callate menor", "cállate menor"];
    if (msg.text.toString().toLowerCase().includes(shutup[0]) || msg.text.toString().toLowerCase().includes(shutup[1])) {
        app.bot.sendMessage(chatId, "Cállate tu, viejo lesbiano.");
    }

    const goy = ["nalat, ¿gregory es marico?", "nalat, ¿manuel es marico?", "nalat, ¿lester es marico?"];
    if (msg.text.toString().toLowerCase().indexOf(goy[0]) === 0 || msg.text.toString().toLowerCase().indexOf(goy[1]) === 0 || msg.text.toString().toLowerCase().indexOf(goy[2]) === 0) {
        app.bot.sendMessage(chatId, "Sí, es tremendo goy");
    }

    const ego = ["nalat, ¿qué opinas de mi?", "nalat, ¿que opinas de mi?"];
    if (msg.text.toString().toLowerCase().indexOf(ego[0]) === 0 || msg.text.toString().toLowerCase().indexOf(ego[1]) === 0) {
        app.bot.sendMessage(chatId, "Que eres burda de bell@.");
    }

    const mierda = "puto bot de mierda";
    if (msg.text.toString().toLowerCase().includes(mierda)) {
        app.bot.sendMessage(chatId, fromName + " epa epa, ¿pendiente de un tiro becerr@?");
    }

    const kevin = ["nalat, ¿que opinas de kevin?", "nalat, ¿qué opinas de kevin?"];
    if (msg.text.toString().toLowerCase().indexOf(kevin[0]) === 0 || msg.text.toString().toLowerCase().indexOf(kevin[1]) === 0) {
        app.bot.sendMessage(chatId, "❤✨❤ Que es burda de bello. ❤✨❤");
    }

    const dolares = "quiero dolares";
    if (msg.text.toString().toLowerCase().includes(dolares)) {
        app.bot.sendMessage(chatId, fromName + " yo también quiero dolares.");
    }

    const bdv = "nalat es un bot";
    if (msg.text.toString().toLowerCase().includes(bdv)) {
        app.bot.sendMessage(chatId, "¡Mentira!, yo soy un niño de verdad.");
    }

    const med = "me dolió";
    if (msg.text.toString().toLowerCase().includes(med)) {
        app.bot.sendMessage(chatId, "Ponte una curita pues, gafo.");
    }

    const parcela = ["qué es una parcela", "que es una parcela"];
    if (msg.text.toString().toLowerCase().includes(parcela[0]) || msg.text.toString().toLowerCase().includes(parcela[1])) {
        app.bot.sendMessage(chatId, "Donde se mete el ganado.");
    }    
});