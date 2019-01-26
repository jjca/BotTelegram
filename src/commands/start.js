'use strict';

const app = require('../settings/app');

app.bot.onText(/^\/start$/, function(msg) {    
    
    app.bot.getChatMember(msg.chat.id, msg.from.id).then(function(user) {        
        
        //Verifica si el comando ha sido enviado en el chat privado del bot.
        if (msg.chat.type == "private") {            
            
            //Mensaje de opciones en formato de teclado.
            app.bot.sendMessage(msg.chat.id,  "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\n" + Welcome(), {
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
            app.bot.sendMessage(msg.from.id, "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\nLa opción para anotarte en una lista solo puede ser en este chat.\n\n" + Welcome(), {
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

/*
--------------------------------------------------------------------------
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
|                              Funciones                                 |
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
--------------------------------------------------------------------------
*/

// Mensaje Principal.
function Welcome() {
    const title = "‼️*Recuerda tres cosas:*‼️";
    const W1 = "1️⃣ Leer las /reglas.";
    const W2 = "2️⃣ Leer de vez en cuando los avisos con: /avisos.";
    const W3 = "3️⃣ Estar en el Amper a las *4:00 PM* para pasar la lista antes de que llegue el bus.";
    const SO = "*Por favor selecciona una opción:*";

    return `${title}\n\n${W1}\n\n${W2}\n\n${W3}\n\n${SO}`;
}