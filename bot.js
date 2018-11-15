//API Telegram.
const TelegramBot = require('node-telegram-bot-api');

//Token proporcionado por FatherBot en Telegram.
const token = '666343994:AAEWabHvGNm9GYzSRyZCgSoeMs75Eey6brg';

// El bot usa 'polling' para obtener actualizaciones.
const bot = new TelegramBot(token, {
    polling: true
});
const request = require('request');

/*
    ---Indice---

    .toString(): Convierte el mensaje enviado por una persona a un string.
    .toLowerCase(): Permite que el string se escriba en mayúsculas y minúsculas.
    .indexOf() === 0: Verifica que la variable (string) se cumpla por completo.
    .includes(): Compara si el mensaje enviado es igual al de la variable.
    msg.chat.id: ID del chat del cual el bot leyó el mensaje.
    msg.from.id: ID de la persona que envió el mensaje que leyó el bot.
    msg.from.first_name: Nombre (solo nombre) de la persona que envió el mensaje que leyó el bot.
    msg.message_id: Mensaje enviado por un usuario.
    msg.chat.type: Tipo de chat en el que se encuentra el bot (privado, grupo o súpergrupo).
    msg.chat.title: Nombre del chat donde se encuentra el bot.
    msg.reply_to_message: Condición si se esta haciendo un "reply" a un mensaje.


*/

/*
--------------------------------------------------------------------------
|               Respuestas a mensajes predeterminados.                   |
--------------------------------------------------------------------------
*/

//Función de lectura de un evento de escucha (mensaje).
bot.on('message', (msg) => {

    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;

    var hola = "hola";
    if (msg.text.toString().toLowerCase().indexOf(hola) === 0) {
        bot.sendMessage(chatId, "Hola " + fromName + ", ¿Qué tal?");
    }

    var cdlm = "coño de la madre";
    if (msg.text.toString().toLowerCase().includes(cdlm)) {
        bot.sendMessage(chatId, fromName + ", Maduro te ama.");
    }

    var mmgv = ["mamaguevo", "mamaguebo", "mamahuevo"];
    if ((msg.text.toString().toLowerCase().includes(mmgv[0])) || (msg.text.toString().toLowerCase().includes(mmgv[1])) || (msg.text.toString().toLowerCase().includes(mmgv[2]))) {
        bot.sendMessage(chatId, fromName + ", ¡NIÑ@!, ¿Con esa boca besas a tú mamá?");

    }

    var digalo = ["digalo ahí nalat", "digalo ahi nalat", "dígalo ahí nalat", "dígalo ahi nalat"];
    if ((msg.text.toString().toLowerCase().indexOf(digalo[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(digalo[1]) === 0) || (msg.text.toString().toLowerCase().indexOf(digalo[2]) === 0) || (msg.text.toString().toLowerCase().indexOf(digalo[3]) === 0)) {
        bot.sendMessage(chatId, "Sisa manauresaurio.");
    }

    var shutup = "callate";
    if (msg.text.toString().toLowerCase().includes(shutup)) {
        bot.sendMessage(chatId, "Callate tu, viejo lesbiano.");
    }

    var nalatmarico = "nalat, ¿eres marico?";
    if (msg.text.toString().toLowerCase().indexOf(nalatmarico) === 0) {
        bot.sendMessage(chatId, "Un poquito menos que el creador.");
    }

    var marico = ["nalat, ¿gregory es marico", "nalat, ¿manuel es marico?", "nalat, ¿lester es marico?"];
    if ((msg.text.toString().toLowerCase().indexOf(marico[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(marico[1]) === 0) || (msg.text.toString().toLowerCase().indexOf(marico[2]) === 0)) {
        bot.sendMessage(chatId, "Sí, es tremendo goy");
    }

    var ego = ["nalat, ¿qué opinas de mi", "nalat, ¿que opinas de mi?"];
    if ((msg.text.toString().toLowerCase().indexOf(ego[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(ego[1]) === 0)) {
        bot.sendMessage(chatId, "Que eres burda de bell@.");
    }

    var mierda = "puto bot de mierda";
    if (msg.text.toString().toLowerCase().indexOf(mierda) === 0) {
        bot.sendMessage(chatId, fromName + " epa epa, ¿pendiente de un tiro becerr@?");
    }

    var yoberson = ["nalat, ¿que opinas de yoberson?", "nalat, ¿qué opinas de yoberson?"];
    if ((msg.text.toString().toLowerCase().indexOf(yoberson[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(yoberson[0])) === 0) {
        bot.sendMessage(chatId, "Que es senda bruja por irse a LDC y no quedarse en MAC.");
    }

    // Palabras prohibidas.
    var sban = "hijo de puta";
    if (msg.text.toString().toLowerCase().includes(sban)) {
        bot.kickChatMember(chatId, fromId);
        bot.sendMessage(chatId, fromName + " Ha sido explusad@ por becerr@.");
        bot.unbanChatMember(chatId, fromId);
    }


});

/*
--------------------------------------------------------------------------
|                              Comandos.                                 |
--------------------------------------------------------------------------
*/

// Mensaje cuando alguien inicia el bot con /start.
bot.onText(/^\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", tienes una cara de marico en esa foto. ¿En qué te puedo ayudar panita?");
});

// Ver el ID del chat.
bot.onText(/^\/chatid/, (msg) => {
    bot.sendMessage(msg.chat.id, "El ID de este chat es: " + msg.chat.id);
});

// Ver mi ID.
bot.onText(/^\/myid/, (msg) => {
    bot.sendMessage(msg.chat.id, "Tu id es: " + msg.from.id);
});

// Juego Ping Pong.
bot.onText(/^\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, "¡Pong!");
});
bot.onText(/^\/pong/, (msg) => {
    bot.sendMessage(msg.chat.id, "¡Ping!");
});

// Enlace de grupo.
bot.onText(/^\/enlace/, (msg) => {

    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const messageId = msg.message_id;
    const chatype = msg.chat.type;
    const fromName = msg.from.first_name;
    const chatitle = msg.chat.title;

    bot.getChatMember(chatId, fromId).then(function (user) {

        //Verifica si la persona en enviar el comando es administrador.
        if ((user.status == 'creator') || (user.status == 'administrator')) {

            //Verifica a que tipo de chat pertenece.
            if (chatype == 'supergroup') {
                bot.exportChatInviteLink(chatId).then(function (enlace) {
                    bot.sendMessage(chatId, "Enlace del grupo " + chatitle + "\n" + enlace);
                    bot.deleteMessage(chatId, messageId);
                });
            } else if ((chatype == 'group') || (chatype == 'private')) {
                bot.sendMessage(chatId, "Comando solo disponible en supergrupos.");
            }
        } else {
            bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador. Solo los administradores pueden usar este comando.");
            bot.deleteMessage(chatId, messageId);
        }
    });
});

//Mandar voice viejo lesbiano
bot.onText(/^\/viejo_lesbiano/, (msg) => {
    bot.sendVoice(msg.chat.id, "./files/viejolesbiano.mp3");
});

//Anclar un mensaje
bot.onText(/^\/pin/, (msg) => {

    //Verifica si la persona está respondiendo a un mensaje, en caso contrario no hará nada.
    if (msg.reply_to_message == undefined) {
        return;
    }

    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const messageId = msg.message_id;
    const chatype = msg.chat.type;
    const replyFrom = msg.reply_to_message.message_id;
    const fromName = msg.from.first_name;

    //Se deshabilita la notificación para el resto de miembros.
    const opts = {};
    opts.disable_notification = false;

    bot.getChatMember(chatId, fromId).then(function (user) {

        //Verifica si la persona en enviar el comando es administrador.
        if ((user.status == 'creator') || (user.status == 'administrator')) {

            //Verifica a que tipo de chat pertenece.
            if (chatype == 'supergroup') {
                bot.pinChatMessage(chatId, replyFrom);
                bot.deleteMessage(chatId, messageId);
            } else if ((chatype == 'group') || (chatype == 'private')) {
                bot.sendMessage(chatId, "Comando solo disponible en supergrupos.");
            }
        } else {
            bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador. Solo los administradores pueden usar este comando.");
            bot.deleteMessage(chatId, messageId);
        }
    })
});

//Desanclar un mensaje
bot.onText(/^\/unpin/, function(msg){

    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const messageId = msg.message_id;
    const fromName = msg.from.first_name;
    
    bot.getChatMember(chatId, fromId).then(function(user){
        if ((user.status == 'creator') || (user.status == 'administrator')){
            bot.deleteMessage(chatId, messageId);
            bot.unpinChatMessage(chatId);
        }
        else {
            bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador. Solo los administradores pueden usar este comando.");
            bot.deleteMessage(chatId, messageId);
        }
    })
});


/*
--------------------------------------------------------------------------
|                           Funcionalidades                              |
--------------------------------------------------------------------------
*/


// Mensaje de bienvenida y de despedida
bot.on('message', function (msg) {

    if (msg.new_chat_members != undefined) {

        bot.sendMessage(msg.chat.id, "Hola " + msg.new_chat_member.first_name + ", bienvenido al grupo " + msg.chat.title);

    } else if (msg.left_chat_member != undefined) {

        bot.sendMessage(msg.chat.id, msg.left_chat_member.first_name + " desertó, ¡Traidor!");

    }
});



/*
--------------------------------------------------------------------------
|                             Zona de pruebas                            |
--------------------------------------------------------------------------
*/


//Funcionamiento de los botones
bot.onText(/^\!botones/, function (msg) {

    var botones = {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Boton 1",
                        callback_data: 'boton1'
                    },
                    {
                        text: "Boton 2",
                        callback_data: 'boton2'
                    }
                ]
            ]
        }
    };

    bot.sendMessage(msg.chat.id, "Este es el texto de una publicación y debajo tengo botones", botones);

    bot.sendMessage(msg.chat.id, "Este es un segundo mensaje, con los botones dentro de un mensaje", {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Boton 3",
                        callback_data: 'boton3'
                    },
                    {
                        text: "Boton 4",
                        callback_data: 'boton4'
                    }
                ]
            ]
        }
    });

    bot.on('callback_query', function onCallbackQuery(accionboton) {

        const data = accionboton.data
        const msg = accionboton.message

        if (data == 'boton1') {
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 1");

        };

        if (data == 'boton2') {
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 2");

        };

        if (data == 'boton3') {
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 3");

        };

        if (data == 'boton4') {
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 4");

        };
    })
});



//Opciones en teclado (Solo funciona en chat privados, es decir, solo con el bot)
bot.onText(/kakaroto/, (msg) => {
    const opts = {
        reply_markup: JSON.stringify({
            keyboard: [
                [{
                    text: 'Location',
                    request_location: true
                }],
                [{
                    text: 'Contact',
                    request_contact: true
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }),
    };
    bot.sendMessage(msg.chat.id, 'Solicitud de Contacto o Localización.', opts);
});

bot.on('location', (msg) => {
    console.log(msg.location.latitude);
    console.log(msg.location.longitude);
});









/*
--------------------------------------------------------------------------
|                               Papelera                                 |
--------------------------------------------------------------------------


//Inserte aquí el código a borrar.



*/