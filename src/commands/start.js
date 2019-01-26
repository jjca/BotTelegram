'use strict';

const app = require('../settings/app')
const functions = require('./functions')

app.bot.onText(/^\/start$/, function(msg) {    
    
    app.bot.getChatMember(msg.chat.id, msg.from.id).then(function(user) {        
        
        //Verifica si el comando ha sido enviado en el chat privado del bot.
        if (msg.chat.type == "private") {            
            
            //Mensaje de opciones en formato de teclado.
            app.bot.sendMessage(msg.chat.id,  "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\n" + functions.welcome, {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [
                        ["Reglas ⚠️", "Hora 🕞"],
                        ["Catia 📝", "Av Sucre 📝"],
                        ["Ver listas 👁"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }        
        //En caso contrario avisa al usuario y el bot le escribe al usuario automaticamente.
        else {      
            app.bot.sendMessage(msg.chat.id, "Lo siento " + msg.from.first_name + " este comando solo está disponible en el chat personal (@Nalatbot).");
            app.bot.sendMessage(msg.from.id, "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\nLa opción para anotarte en una lista solo puede ser en este chat.\n\n" + functions.welcome, {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [
                        ["Reglas ⚠️", "Hora 🕞"],
                        ["Catia 📝", "Av Sucre 📝"],
                        ["Ver listas 👁"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }
    });
});