'use strict';

//API Telegram.
const TelegramBot = require("node-telegram-bot-api");

// Token proporcionado por FatherBot en Telegram.
//const token = process.env.TELEGRAM_TOKEN;
const token = '722728420:AAH-yr_fG3ACNukSV8MluoKAyJsJEqY24iw';

// El bot usa 'polling' para obtener actualizaciones.
const bot = new TelegramBot(token, { polling: true });

// Modulos exportados.
module.exports = {bot}