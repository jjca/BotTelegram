'use strict';

const app = require('../settings/app');

//FAQ.
app.bot.onText(/^\/faq$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, Faq(), { parse_mode: "Markdown" });
});
  
//Reglas.
app.bot.onText(/^\/reglas$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, Rules(), { parse_mode: "Markdown" });
});

//Comandos.
app.bot.onText(/^\/comandos$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, Commands(), { parse_mode: "Markdown" });
});

//Grupos.
app.bot.onText(/^\/grupos$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, Groups(), { disable_web_page_preview: true, parse_mode: "Markdown" });
});

//Hora.
app.bot.onText(/^\/hora$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, `La hora es: *${getDateTime()}*`, { parse_mode: "Markdown" });
});

//ID del chat.
app.bot.onText(/^\/chatid$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, "El ID de este chat es: " + msg.chat.id);
});
  
//Ver ID.
app.bot.onText(/^\/myid$/, function(msg) {
    app.bot.sendMessage(msg.chat.id, "Tu id es: " + msg.from.id);
});
  
//Juego Ping Pong.
app.bot.onText(/^\/ping/, function(msg) {
    app.bot.sendMessage(msg.chat.id, "¡Pong!");
});
app.bot.onText(/^\/pong/, function(msg) {
    app.bot.sendMessage(msg.chat.id, "¡Ping!");
});
  
//Repositorio
app.bot.onText(/^\/repositorio/, function(msg) {
    app.bot.sendMessage(msg.chat.id, "https://github.com/MaEscalanteHe/BotTelegram");
});

/*
--------------------------------------------------------------------------
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
|                              Funciones                                 |
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
--------------------------------------------------------------------------
*/

// Mensaje de preguntas frecuentes.
var faq = Faq();
function Faq() {

    const title = "📊 *Preguntas Frecuentes* 📊";
    const Q1 = "*¿Quienes son los administradores del bot?*";
    const A1 = "▫️_Manuel Escalante_ (@MaEscalanteHe).\n▪_Manuel Rodriguez_ (@ManuelitoD).\n▪_Javier Medina_ (@JBadBunny).";
    const Q2 = "*¿Cómo puedo ver el código del bot?*";
    const A2 = "_Usando el comando_ /repositorio.";

    return `${title}\n\n${Q1}\n${A1}\n\n${Q2}\n${A2}`;
}

// Mensaje de comandos disponibles.
var commands = Commands();
function Commands() {

    const title = "⌨️ *Comandos Disponlibles* ⌨️";
    const C1 = "/start - Inicia la funcionalidad principal del bot.";
    const C2 = "/hora - Muestra la hora actual del servidor.";
    const C3 = "/verlistas - Muestra las listas (Catia/AvSucre) de forma detallada.";
    const C4 = "/reglas - Reglas para el uso apropiado del bot.";
    const C5 = "/avisos - Muestra avisos relevantes.";
    const C6 = "/grupos - Enlaces de los grupos de Telegram, de Catia y Agua Salud.";
    const C7 = "/faq - Preguntas frecuentes";

    return `${title}\n\n${C1}\n${C2}\n${C3}\n${C4}\n${C5}\n${C6}\n${C7}`;
}

// Mensaje de grupos.
var groups = Groups();
function Groups() {

    const title = "⌨️ *Grupos de Telegram* ⌨️";
    const GC = "*Grupo de Catia:*\n⚠️ Unirse bajo su propio riesgo, puro desmadre ⚠️.";
    const LC = "[Los Bendecidos de Catia](https://t.me/LosBendecidosdeCatia)";
    const GAS = "*Grupo de Av Sucre:*";
    const LAS = "[AvSucre](https://t.me/AvSucre)";
    
    return `${title}\n\n${GC}\n${LC}\n\n${GAS}\n${LAS}`;
}

// Función de tiempo.
function getDateTime() {
    
    let date = new Date();
    let year = date.getFullYear(); 
    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;  
    let day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;  
    let min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;  
    let sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;           
  
    return `${hour}:${min}:${sec}`;
}