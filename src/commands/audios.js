'use strict';

const app = require('../settings/app');

app.bot.on("message", function(msg) {

    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;
    
    const pmmgva = "por mamagueva";
    if (msg.text.toString().toLowerCase().includes(pmmgva)) {
        app.bot.sendVoice(chatId, "./src/files/audios/mamagueva.mp3");
    }

    const maricodv = "marico de verdad";
    if (msg.text.toString().toLowerCase().includes(maricodv)) {
        app.bot.sendVoice(chatId, "./src/files/audios/marico.mp3");
    }

    const volo = "voló";
    if (msg.text.toString().toLowerCase().includes(volo)) {
        app.bot.sendVoice(chatId, "./src/files/audios/volo.mp3");
    }

    const enanomarico = ["qué vas a saber tú", "qué vas a saber tu", "que vas a saber tú", "que vas a saber tu"];
    if (msg.text.toString().toLowerCase().includes(enanomarico[0]) || msg.text.toString().toLowerCase().includes(enanomarico[1]) || msg.text.toString().toLowerCase().includes(enanomarico[2]) || msg.text.toString().toLowerCase().includes(enanomarico[3])) {
        app.bot.sendVoice(chatId, "./src/files/audios/enanomarico.mp3");
    }

    const nalatmarico = "nalat, ¿eres marico?";
    if (msg.text.toString().toLowerCase().indexOf(nalatmarico) === 0) {
        app.bot.sendVoice(chatId, "./src/files/audios/nosoymarico.mp3");
    }

    const matalosatodos = "matalos a todos";
    if (msg.text.toString().toLowerCase().includes(matalosatodos)) {
        app.bot.sendVoice(chatId, "./src/files/audios/matalosatodos.mp3");
    }

    const ggg = "nalat, lanzate una ahí";
    if (msg.text.toString().toLowerCase().indexOf(ggg) === 0) {
        app.bot.sendVoice(chatId, "./src/files/audios/gafogafogafo.mp3");
    }

    const estudiar = "vamos a estudiar";
    if (msg.text.toString().toLowerCase().includes(estudiar)) {
        app.bot.sendVoice(chatId, "./src/files/audios/vamosaestudiar.mp3");
    }

    const meca = "es la meca de la irreverencia";
    if (msg.text.toString().toLowerCase().indexOf(meca) === 0) {
        app.bot.sendVoice(chatId, "./src/files/audios/eslamecadelairreverencia.mp3");
    }
});