const TelegramBot = require('node-telegram-bot-api');

// API Token Telegram
const token = '666343994:AAEWabHvGNm9GYzSRyZCgSoeMs75Eey6brg';

// El bot usa 'polling' para obtener actualizaciones
const bot = new TelegramBot(token, {
    polling: true
});
const request = require('request');




// Respuestas a mensajes predeterminados

bot.on('message', (msg) => {
    var hola = "hola";
    if (msg.text.toString().toLowerCase().indexOf(hola) === 0) {
        bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", ¿Qué tal?");
        bot.getUserProfilePhotos(userId, );
    }

    var cdlm = "coño de la madre";
    if (msg.text.toString().toLowerCase().includes(cdlm)) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + ", Maduro te ama");
    }

    var mmgv = "mamaguevo";
    if (msg.text.toString().toLowerCase().includes(mmgv)) {
        bot.sendMessage(msg.chat.id, msg.from.first_name + ", ¡NIÑ@!, ¿Con esa boca besas a tú mamá?");

    }

    var digalo = "digalo ahí nalat";
    var digalo2 = "digalo ahi nalat";
    if (msg.text.toString().toLowerCase().indexOf(digalo) === 0 || msg.text.toString().toLowerCase().indexOf(digalo2) === 0) {
        bot.sendMessage(msg.chat.id, "Sisa manauresaurio");
    }
});

//Comandos

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", soy Nalat en que puedo ayudarte");
});

/* 

/* const mpbr = /Hola ||HOLA ||hola ||Buenas ||buenas ||Hola Nalat ||hola Nalat/;
const cdlm = /Coño de la madre ||COÑO DE LA MADRE ||Coño De La Made ||coño de la madre/;
const mmgv = /Mamaguevo ||mamaguevo ||MAMAGUEVO ||Mamahuevo ||mamahuevo ||MAMAHUEVO ||mmgv ||MMGV/;
bot.on(mpbr, (msg) => {
   // var what = ["goku", "kakaroto"];
   // if (msg.text.includes(mpbr)) {
    bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", ¿Qué tal?");
    //}
    });



bot.onText(/Digalo ahí Nalat/, (msg) => {
    bot.sendMessage(msg.chat.id, "Sisa manauresaurio");
});
bot.onText(/Callate/, (msg) => {
    bot.sendMessage(msg.chat.id, "Callate tu viejo lesbiano");
});
bot.onText(/Nalat, ¿Eres marico?/, (msg) => {
    bot.sendMessage(msg.chat.id, "Un poquito menos que el creador");
});

bot.onText(/Nalat, ¿Gregory es marico?/, (msg) => {
    bot.sendMessage(msg.chat.id, "Sí, es tremendo goy");
});

bot.onText(/Nalat, ¿Manuel es marico?/, (msg) => {
    bot.sendMessage(msg.chat.id, "Sí, es tremendo goy");
});

bot.onText(/Nalat, ¿Qué opinas de Yoberson?/, (msg) => {
    bot.sendMessage(msg.chat.id, "Que es senda bruja por irse a LDC y no quedarse en MAC");
});

bot.onText(/Puto bot de mierda/, (msg) => {
    bot.sendMessage(msg.chat.id, msg.from.first_name + " epa epa, ¿pendiente de un tiro?");
});

bot.onText(/Nalat, ¿Qué opinas de mi?/, (msg) => {
    bot.sendMessage(msg.chat.id, "Que eres burda de bello/a");
});

// Mensaje cuando alguien inicia el bot con /start


// Juego Ping Pong
bot.onText(/\/ping/, (msg) => {
    bot.sendMessage(msg.chat.id, "Pong!");
});

// Mensaje de bienvenida y de despedida
bot.on('message', function (msg) {

    if (msg.new_chat_members != undefined) {

        var nameNewMember = msg.new_chat_member.first_name;

        bot.sendMessage(msg.chat.id, "Hola " + nameNewMember + ", bienvenido al grupo " + msg.chat.title);
    } else if (msg.left_chat_member != undefined) {

        var nameLeftMember = msg.left_chat_member.first_name;

        bot.sendMessage(msg.chat.id, nameLeftMember + " desertó, ¡Traidor!");
    }
});

// Ver el ID del chat
bot.onText(/^\/chatid/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "El id de este chat es: " + chatId);
});

// Ver el ID de la persona
bot.onText(/^\/myid/, (msg) => {
    const chatId = msg.chat.id;
    const myId = msg.from.id;
    bot.sendMessage(chatId, "Tu id es: " + myId);
});

// Borrar mensajes del bot
// bot.onText(/^\/borrar/, (msg) => {
//     var chatId = msg.chat.id;
//     var messageId = msg.message_id;

//     if (msg.reply_to_message == undefined){
//         return; 
//     }

//     bot.deleteMessage(chatId, messageId);
// });

// // Borrar todo


// bot.onText(/^\/borratodo/, (msg) => {
//     var chatId = msg.chat.id;
//     var messageId = msg.message_id;
//     var replyMessage = msg.reply_to_message.message_id;

//     if (msg.reply_to_message == undefined){
//         return;
//     }

//     bot.deleteMessage(chatId, messageId);
//     bot.deleteMessage(chatId, replyMessage);
// });

// Palabras prohibidas
bot.on('message', (msg) => {
    var sban = "idiota";
    if (msg.text.includes(sban)) {
        bot.kickChatMember(msg.chat.id, msg.from.id);
        bot.sendMessage(msg.chat.id, msg.from.first_name + " Ha sido explusada por insultar.");
        bot.unbanChatMember(msg.chat.id, msg.from.id);
    }
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
            bot.sendMessage(chatId, "Solo administradores y creador pueden usar este comando.");
        }
    });
}); 
*/