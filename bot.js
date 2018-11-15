const TelegramBot = require('node-telegram-bot-api');

// API Token Telegram
const token = '666343994:AAEWabHvGNm9GYzSRyZCgSoeMs75Eey6brg';

// El bot usa 'polling' para obtener actualizaciones
const bot = new TelegramBot(token, {
    polling: true
});
const request = require('request');


/*
--------------------------------------------------------------------------
|               Respuestas a mensajes predeterminados.                   |
--------------------------------------------------------------------------
*/

bot.on('message', function (msg) {
    var hola = "hola";
    if (msg.text.toString().toLowerCase().indexOf(hola) === 0) {
        bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", ¿Qué tal?");
    }

    var cdlm = "coño de la madre";
    if (msg.text.toString().toLowerCase().includes(cdlm)) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + ", Maduro te ama.");
    }

    var mmgv = "mamaguevo";
    if (msg.text.toString().toLowerCase().includes(mmgv)) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + ", ¡NIÑ@!, ¿Con esa boca besas a tú mamá?");

    }

    var digalo = ["digalo ahí nalat", "digalo ahi nalat", "dígalo ahí nalat", "dígalo ahi nalat"];
    if ((msg.text.toString().toLowerCase().indexOf(digalo[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(digalo[1]) === 0) || (msg.text.toString().toLowerCase().indexOf(digalo[2]) === 0) || (msg.text.toString().toLowerCase().indexOf(digalo[3]) === 0)) {
        bot.sendMessage(msg.chat.id, "Sisa manauresaurio.");
    }

    var shutup = "callate";
    if (msg.text.toString().toLowerCase().includes(shutup)) {
        bot.sendMessage(msg.chat.id, "Callate tu, viejo lesbiano.");
    }

    var nalatmarico = "nalat, ¿eres marico?";
    if (msg.text.toString().toLowerCase().indexOf(nalatmarico) === 0) {
        bot.sendMessage(msg.chat.id, "Un poquito menos que el creador.");
    }

    var marico = ["nalat, ¿gregory es marico", "nalat, ¿manuel es marico?", "nalat, ¿lester es marico?"];
    if ((msg.text.toString().toLowerCase().indexOf(marico[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(marico[1]) === 0) || (msg.text.toString().toLowerCase().indexOf(marico[2]) === 0)) {
        bot.sendMessage(msg.chat.id, "Sí, es tremendo goy");
    }

    var ego = ["nalat, ¿qué opinas de mi", "nalat, ¿que opinas de mi?"];
    if ((msg.text.toString().toLowerCase().indexOf(ego[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(ego[1]) === 0)) {
        bot.sendMessage(msg.chat.id, "Que eres burda de bello/a.");
    }

    var mierda = "puto bot de mierda";
    if (msg.text.toString().toLowerCase().indexOf(mierda) === 0) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + " epa epa, ¿pendiente de un tiro becerro?");
    }

    var yoberson = ["nalat, ¿que opinas de yoberson?", "nalat, ¿qué opinas de yoberson?"];
    if ((msg.text.toString().toLowerCase().indexOf(yoberson[0]) === 0) || (msg.text.toString().toLowerCase().indexOf(yoberson[0])) === 0) {
        bot.sendMessage(msg.chat.id, "Que es senda bruja por irse a LDC y no quedarse en MAC.");
    }

    // Palabras prohibidas
    var sban = "hijo de puta";
    if (msg.text.toString().toLowerCase().includes(sban)) {
        bot.kickChatMember(msg.chat.id, msg.from.id);
        bot.sendMessage(msg.chat.id, msg.from.first_name + " Ha sido explusad@ por becerr@.");
        bot.unbanChatMember(msg.chat.id, msg.from.id);
    }


});

/*
--------------------------------------------------------------------------
|                              Comandos                                  |
--------------------------------------------------------------------------
*/

// Mensaje cuando alguien inicia el bot con /start
bot.onText(/^\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", tienes una cara de marico en esa foto. ¿En qué te puedo ayudar panita?");
});

// Ver el ID del chat
bot.onText(/^\/chatid/, (msg) => {
    bot.sendMessage(msg.chat.id, "El ID de este chat es: " + msg.chat.id);
});

// Ver mi ID
bot.onText(/^\/myid/, (msg) => {
    bot.sendMessage(msg.chat.id, "Tu id es: " + msg.from.id);
});

// Juego Ping Pong
bot.onText(/^\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, "¡Pong!");
});
bot.onText(/^\/pong/, (msg) => {
    bot.sendMessage(msg.chat.id, "¡Ping!");
});

// Enlace de grupo
bot.onText(/^\/enlace/, function (msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    var messageId = msg.message_id;
    var chatTitle = msg.chat.title;

    bot.getChatMember(chatId, userId).then(function (user) {
        if ((user.status == 'creator') || (user.status == 'administrator')) {
            bot.exportChatInviteLink(chatId).then(function (enlace) {
                bot.deleteMessage(chatId, messageId);
                bot.sendMessage(chatId, "Enlace del grupo " + chatTitle + "\n" + enlace);
            });
        } else {
            bot.deleteMessage(chatId, messageId);
            bot.sendMessage(chatId, "Solo los administradores pueden usar este comando.");
        }
    });
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
bot.onText(/^\!botones/, function(msg){

    var botones = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Boton 1", callback_data:'boton1'},
                    {text: "Boton 2", callback_data: 'boton2'}
                ]
            ]
        }
    };

    bot.sendMessage(msg.chat.id, "Este es el texto de una publicación y debajo tengo botones", botones);

    bot.sendMessage(msg.chat.id, "Este es un segundo mensaje, con los botones dentro de un mensaje",
    {reply_markup: {
        inline_keyboard: [
            [
                {text: "Boton 3", callback_data: 'boton3'},
                {text: "Boton 4", callback_data: 'boton4'}
            ]
        ]
    }});

    bot.on('callback_query', function onCallbackQuery(accionboton){

        const data = accionboton.data
        const msg = accionboton.message

        if (data == 'boton1'){
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 1");

        };

        if (data == 'boton2'){
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 2");

        };

        if (data == 'boton3'){
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 3");

        };

        if (data == 'boton4'){
            bot.sendMessage(msg.chat.id, "Hola, soy la accion del Boton 4");

        };
    })
});



//Opciones en teclado
bot.onText(/kakaroto/, (msg) => {
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{text: 'Location', request_location: true}],
          [{text: 'Contact', request_contact: true}],
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
*/
