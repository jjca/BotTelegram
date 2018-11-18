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
    .push(): Introduce objetos a un array.
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
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
|                        Funcionalidad Principal.                        |
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
--------------------------------------------------------------------------
*/

//Habilita la opcion de responder mensaje por defecto.
var opts = {
    reply_markup: JSON.stringify({
        force_reply: true
    }
)};

//Arrays de listas.
var listacatia = [];
var listaaguasalud = [];

//Función de tiempo
function getDateTime(){
    
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return hour + ":" + min;

}

//Comando /start que inicia la funcionalidad principal del bot.
bot.onText(/^\/start/, function(msg){
    
    bot.getChatMember(msg.chat.id, msg.from.id).then(function(user){

        //Verifica si el comando ha sido enviado en el chat privado del bot.
        if (msg.chat.type == 'private'){
            
            //Mensaje de opciones en formato de teclado.
            bot.sendMessage(msg.chat.id, "Hola " + msg.from.first_name + ", tienes una cara de marico en esa foto. ¿En qué te puedo ayudar panita?", {
                reply_markup: {
                    keyboard: [["Catia", "Agua Salud"],   ["Ver listas"]],
                    resize_keyboard: true,
                    one_time_keyboard: false,
                }
            });
        }
        //En caso contrario avisa al usuario y el bot le escribe al usuario automaticamente.
        else {
            bot.sendMessage(msg.chat.id, "Lo siento " + msg.from.first_name + " este comando solo está disponible en el chat personal (@Nalatbot).");
            bot.sendMessage(msg.from.id, "Hola " + msg.from.first_name + ", tienes una cara de marico en esa foto. ¿En qué te puedo ayudar panita?", {
                reply_markup: {
                    keyboard: [["Catia", "Agua Salud"],   ["Ver listas"]],
                    resize_keyboard: true,
                    one_time_keyboard: false,
                }
            });
        }
    });        
});

//Función de lectura de mensajes.
bot.on('message', function(msg){
        
    var verlista = "ver lista";
    if (msg.text.toString().toLowerCase().indexOf(verlista) === 0){
        
        //Ciclo para enviar la lista del array "listacatia".
        var for_catia = "";
        for(i=0; i<listacatia.length; i++){
            for_catia += (i+1) + ".- " + listacatia[i] + "\n";
        }
        
        //Ciclo para enviar la lista del array "listaaguasalud".
        var for_aguasalud = "";
        for(i=0; i<listaaguasalud.length; i++){
            for_aguasalud += (i+1) + ".- " + listaaguasalud[i] + "\n";
        }
        
        //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
        bot.sendMessage(msg.chat.id, "Lista Catia:\n" + for_catia + "\nLista Agua Salud:\n" + for_aguasalud);
    }
        
    var catia = "catia";
    if (msg.text.toString().toLowerCase().indexOf(catia) === 0){
        
        
        var fecha= new Date();
        var hora_actual = fecha.getHours();
        if (hora_actual >= 15){

            //Mensaje de solicitud de nombre para la lista de Catia.
            bot.sendMessage(msg.from.id, "Has elegido la lista de Catia.\nPor favor introduce tu nombre.", opts)
                .then(function(sended){
                    
                    //Escucha de solicitud del nombre.
                    bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg){
                        
                        //Función que introduce el nombre introducido en el array de "listacatia".
                        listacatia.push(msg.text.toString() + " (Se anotó a las: " + getDateTime() + ").");
                        
                        //Mensaje de opciones.
                        bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de Catia.", {
                            reply_markup: {
                                keyboard: [["Catia", "Agua Salud"],   ["Ver listas"]],
                                resize_keyboard: true,
                                one_time_keyboard: false,
                            }
                        });
                    });
                });
        }
        else{

            bot.sendMessage(msg.from.id, "Lo siento, debes esperar hasta las 3:00 pm para poder anotarte.");
        }    
    }    
        
    var aguasalud = "agua salud";
    if (msg.text.toString().toLowerCase().indexOf(aguasalud) === 0){
        
        var fecha= new Date();
        var hora_actual = fecha.getHours();
        if (hora_actual >= 15){

            //Mensaje de solicitud de nombre para la lista de Agua Salud.
            bot.sendMessage(msg.from.id, "Has elegido la lista de Agua Salud.\nPor favor introduce tu nombre.", opts)
                .then(function(sended){
                    
                    //Escucha de solicitud del nombre.
                    bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg){
                        
                        //Función que introduce el nombre introducido en el array de "listaaguasalud".
                        listaaguasalud.push(msg.text.toString() + " (Se anotó a las: " + getDateTime() + ").");
                        
                        //Mensaje de opciones.
                        bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de Agua Salud.", {
                            reply_markup: {
                                keyboard: [["Catia", "Agua Salud"],   ["Ver listas"]],
                                resize_keyboard: true,
                                one_time_keyboard: false,
                            }
                        });
                    });
                });
        }
    } 
});

//Comando para borrar las listas(Solo Administradores).
bot.onText(/^\/borrar_listas/, function(msg){

    bot.getChatMember(msg.chat.id, msg.from.id).then(function(user){

        if ((msg.chat.type == 'supergroup') && ((msg.chat.id == '-1001267470378') || (msg.chat.id == '-1001373947855'))){

            if ((user.status == 'creator') || (user.status == 'administrator')){

                bot.sendMessage(msg.chat.id, "Por favor elige que lista quieres borrar.", {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: "Catia", callback_data: 'borrarcatia'},
                                {text: "Agua Salud", callback_data: 'borraraguasalud'}
                            ]
                        ]
                    }
                });
            
                bot.on('callback_query', function(accionboton){

                    const data = accionboton.data;
                    const msg = accionboton.message;

                    if (data == 'borrarcatia'){

                        bot.sendMessage(msg.chat.id, "Has elegido borrar la lista de Catia. ¿Estás seguro?", {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {text: "Sí", callback_data: 'aceptarcatia'},
                                        {text: "No", callback_data: 'cancelarcatia'}
                                    ]
                                ]
                            }
                        });
                
                        bot.on('callback_query', function(confirmacionboton){

                            const data = confirmacionboton.data;
                            const msg = confirmacionboton.message;

                            if (data == 'aceptarcatia'){

                                var for_catia = "";
                                for(i=0; i<listacatia.length; i++){
                                    for_catia += (i+1) + ".- " + listacatia[i] + "\n";
                                }
                                bot.sendMessage(msg.chat.id, "Se borrará esta lista:\nLista Catia:\n" + for_catia + "\n\n¿Estás seguro?", {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                {text: "No", callback_data: 'cancelar2catia'},
                                                {text: "Sí", callback_data: 'aceptar2catia'}
                                            ]
                                        ]
                                    }
                                });

                                bot.on('callback_query', function(confirmacion2boton){

                                    const data = confirmacion2boton.data;
                                    const msg = confirmacion2boton.message;

                                    if (data == 'cancelar2catia'){

                                        bot.sendMessage(msg.chat.id, "La solicitud de borrado ha sido cancelada.");
                                    }
                                
                                    if (data == 'aceptar2catia'){

                                        listacatia = [];
                                        var for_catia = "";
                                        for(i=0; i<listacatia.length; i++){
                                            for_catia += (i+1) + ".- " + listacatia[i] + "\n";
                                        }
                                        bot.sendMessage(msg.chat.id, "La lista de Catia se ha borrado exitosamente.\n\n" + for_catia);
                                    }                              
                                });
                            }
                            
                            if (data == 'cancelarcatia'){

                                bot.sendMessage(msg.chat.id, "La solicitud de borrado ha sido cancelada.");
                            }
                        });
                    }

                    if (data == 'borraraguasalud'){

                        bot.sendMessage(msg.chat.id, "Has elegido borrar la lista de Agua Salud. ¿Estás seguro?", {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {text: "Sí", callback_data: 'aceptaraguasalud'},
                                        {text: "No", callback_data: 'cancelaraguasalud'}
                                    ]
                                ]
                            }
                        });
                
                        bot.on('callback_query', function(confirmacionboton){

                            const data = confirmacionboton.data;
                            const msg = confirmacionboton.message;

                            if (data == 'aceptaraguasalud'){

                                var for_aguasalud = "";
                                for(i=0; i<listaaguasalud.length; i++){
                                    for_aguasalud += (i+1) + ".- " + listaaguasalud[i] + "\n";
                                }
                                bot.sendMessage(msg.chat.id, "Se borrará esta lista:\nLista Agua Salud:\n" + for_aguasalud + "\n\n¿Estás seguro?", {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                {text: "No", callback_data: 'cancelar2aguasalud'},
                                                {text: "Sí", callback_data: 'aceptar2aguasalud'}
                                            ]
                                        ]
                                    }
                                });

                                bot.on('callback_query', function(confirmacion2boton){

                                    const data = confirmacion2boton.data;
                                    const msg = confirmacion2boton.message;

                                    if (data == 'cancelar2aguasalud'){

                                        bot.sendMessage(msg.chat.id, "La solicitud de borrado ha sido cancelada.");
                                    }
                                
                                    if (data == 'aceptar2aguasalud'){

                                        listaaguasalud = [];
                                        var for_aguasalud = "";
                                        for(i=0; i<listaaguasalud.length; i++){
                                            for_aguasalud += (i+1) + ".- " + listaaguasalud[i] + "\n";
                                        }
                                        bot.sendMessage(msg.chat.id, "La lista de Agua Salud se ha borrado exitosamente.\n\n" + for_aguasalud);
                                    }                              
                                });
                            }

                            if (data == 'cancelaraguasalud'){

                                bot.sendMessage(msg.chat.id, "La solicitud de borrado ha sido cancelada.");
                            }
                        });
                    }
                });
            }
            
            else {

                bot.sendMessage(msg.chat.id, "Disculpa " + msg.from.first_name + ", este comando solo está disponible para los administradores del grupo.");
            }

        }
        else{

            bot.sendMessage(msg.chat.id, "Disculpa " + msg.from.first_name + ", este comando solo se puede ejecutar en el grupo de la administración del bot.");
        }
    });
});


/*
--------------------------------------------------------------------------
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
|                               Pa' la joda.                             |
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
--------------------------------------------------------------------------
*/

/*
--------------------------------------------------------------------------
|               Respuestas a mensajes predeterminados.                   |
--------------------------------------------------------------------------
*/

//Función de lectura de un evento de escucha (mensaje).
bot.on('message', function(msg){

    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;

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

    var shutup = ["callate", "cállate"];
    if ((msg.text.toString().toLowerCase().includes(shutup[0])) || (msg.text.toString().toLowerCase().includes(shutup[1]))) {
        bot.sendMessage(chatId, "Cállate tu, viejo lesbiano.");
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

    var dolares = "quiero dolares";
    if (msg.text.toString().toLowerCase().indexOf(dolares) === 0) {
        bot.sendMessage(chatId, fromName + " yo también quiero dolares.");
    }

    var sebin = "sebin";
    if (msg.text.toString().toLowerCase().includes(sebin)) {
        bot.sendPhoto(chatId, "./files/sebin.jpg");
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

// Ver el ID del chat.
bot.onText(/^\/chatid/, function(msg){
    bot.sendMessage(msg.chat.id, "El ID de este chat es: " + msg.chat.id);
});

// Ver mi ID.
bot.onText(/^\/myid/, function(msg){
    bot.sendMessage(msg.chat.id, "Tu id es: " + msg.from.id);
});

// Juego Ping Pong.
bot.onText(/^\/ping/, function(msg){
    bot.sendMessage(msg.chat.id, "¡Pong!");
});
bot.onText(/^\/pong/, function(msg){
    bot.sendMessage(msg.chat.id, "¡Ping!");
});

// Enlace de grupo.
bot.onText(/^\/enlace/, function(msg){

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
bot.onText(/^\/viejolesbiano/, function(msg){
    bot.sendVoice(msg.chat.id, "./files/viejolesbiano.mp3");
});

//Mandar voice palo por ese culo
bot.onText(/^\/paloporeseculo/, function(msg){
    bot.sendVoice(msg.chat.id, "./files/paloporeseculo.mp3");
});

//Comando /mute.
bot.onText(/^\/mute (.+)/, function(msg, match){
    
    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const replyId = msg.reply_to_message.from.id;
    const replyName = msg.reply_to_message.from.first_name;
    const fromName = msg.from.first_name;
    
    //Se recogerá en el comando el tiempo de baneo.
    var tiempo = match[1];
    
    //Nos permite manejar el tiempo.
    var ms = require('ms');
    
    //Manejaremos los privilegios que el usuario tendrá restringidos.
    const perms = {};
    perms.can_send_message = false;
    perms.can_send_media_messages = false;
    perms.can_send_other_messages = false;
    perms.can_can_add_web_page_previews = false;
    
    if (msg.reply_to_message == undefined){
        return;
    }
    
    bot.getChatMember(chatId, fromId).then(function(user){
        if ((user.status == 'creator') || (user.status == 'administrator')){
            bot.restrictChatMember(chatId, replyId, {until_date: Math.round((Date.now() + ms(tiempo + "days")/1000))}, perms).then(function(result){
            bot.sendMessage(chatId, "El usuario " + replyName + " ha sido muteado durante " + tiempo + " días");
            });
        } else {
            bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador. Solo los administradores pueden usar este comando.");
            bot.deleteMessage(chatId, messageId);
        }
    });
});


//Comando /unmute.
bot.onText(/^\/unmute/, function(msg){
    
    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;
    const replyName = msg.reply_to_message.from.first_name;
    const replyId = msg.reply_to_message.from.id;
    
    const perms = {};    
    perms.can_send_message = true;
    perms.can_send_media_messages = true;
    perms.can_send_other_messages = true;
    perms.can_can_add_web_page_previews = true;
    
    if (msg.reply_to_message == undefined){
        return;
    }
    
    bot.getChatMember(chatId, fromId).then(function(data){
        if ((data.status == 'creator') || (data.status == 'administrator')){
            bot.restrictChatMember(chatId, replyId, perms).then(function(result){
                bot.sendMessage(chatId, "El usuario " + replyName + " ha sido desmuteado");
            });
        }
        else {
            bot.sendMessage(chatId, "Lo siento " + fromName + " no eres administrador. Solo los administradores pueden usar este comando.");
            bot.deleteMessage(chatId, messageId);
        }
    });
});


/*
--------------------------------------------------------------------------
|                           Funcionalidades                              |
--------------------------------------------------------------------------
*/

// Mensaje de bienvenida y de despedida
bot.on('message', function(msg){

    if (msg.new_chat_members != undefined){

        bot.sendMessage(msg.chat.id, "Hablale " + msg.new_chat_member.first_name + ", bienvenido al grupo " + msg.chat.title);
    } 
    
    if (msg.left_chat_member != undefined){

        bot.sendMessage(msg.chat.id, msg.left_chat_member.first_name + " desertó, ¡Traidor!");
    }
});

/*
--------------------------------------------------------------------------
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
|                            Zona de pruebas.                            |
|------------------------------------------------------------------------|
|------------------------------------------------------------------------|
--------------------------------------------------------------------------
*/

bot.onText(/^\/test/, function(msg){
    bot.sendMessage(msg.chat.id, getDateTime());
});



/*
--------------------------------------------------------------------------
|                               Papelera                                 |
--------------------------------------------------------------------------


//Inserte aquí el código a borrar.

///editable
bot.onText(/\/editable/, function onEditableText(msg) {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Editar Texto', callback_data: 'edit'}
                ]
            ]
        }
    };
    
    bot.sendMessage(msg.from.id, 'Original Text', opts);
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    let text;
  
    if (action === 'edit') {
        text = 'Texto editado';
    }
  
    bot.editMessageText(text, opts);
});





//Mandar mensaje personalizado a un grupo
bot.onText(/\/prueba/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "Introduce a donde quieres mandar el mensaje.", {
        reply_markup: {
            one_time_keyboard: true,
            resize_keyboard: true,
            keyboard: [
                ["\"Grupo de desarrollo de @Nalatbot.\""], 
                ["\"Los bendecidos de Catia.\""]
            ]
        }
    });
});

bot.on('message', (msg) => {
    
    var GDN = "\"Grupo de desarrollo de @Nalatbot.\"";
    if(msg.text.indexOf(GDN) === 0){
        
        bot.on('message', function(match){
            const resp = match[1]
            bot.sendMessage(-1001373947855, "test");
        });
        
    }

    var LBDC = "\"Los bendecidos de Catia.\"";
    if(msg.text.indexOf(LBDC) === 0){
        bot.sendMessage(-1001267470378, "test");
    }
});





if (msg.new_chat_member.is_bot == true){ // acción }

*/