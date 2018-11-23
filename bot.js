//API Telegram.
const TelegramBot = require("node-telegram-bot-api");

//Token proporcionado por FatherBot en Telegram.
const token = "666343994:AAGN7S33L21bTtTovw43d5VRZx7ci9ScdE8";

// El bot usa 'polling' para obtener actualizaciones.
const bot = new TelegramBot(token, {
  polling: true
});
const request = require("request");

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

//Función de reglas.
function Rules() {
    
    var title = "⚠️ Reglas para el uso de las listas digitales *Catia/Agua Salud* ⚠️\n\n\n";
    var rule1 = "1️⃣ Al momento de anotarse en las listas colocar su *Nombre* y *Apellido*, de lo contrario será omitido a la hora de abordar el bus.\n\n";
    var rule2 = "2️⃣ *Evitar* anotar a más de dos personas en un mismo dispositivo. En caso de hacerlo, de forma consecutiva, la tercera persona será omitida de la lista.\n\n";
    var rule3 = "3️⃣ Recordar que el transporte es de empleados y los mismos tienen prioridad al momento de abordar el bus, por tanto si quedan empleados de pie los últimos de la lista deben ceder el puesto.";
  
    return title + rule1 + rule2 + rule3;
}

//Función de tiempo
function getDateTime() {
    
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
  
    return hour + ":" + min + ":" + sec;
}

//Habilita la opcion de responder mensaje por defecto.
var opts = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
        force_reply: true
    })
};

//Arrays de listas básicas.
var listacatia = [];
var listaaguasalud = [];

//Arrays de listas extendidas.
var listacatia_ext = [];
var listaaguasalud_ext = [];

//Arrays de copias de seguridad de las listas.
var lccopia = [];
var lascopia = [];

//ID's
var Kevin_Lopez = "790564315";
var Javier_Medina = "5675284";

//Comando /start que inicia la funcionalidad principal del bot.
bot.onText(/^\/start/, function(msg) {    
    
    bot.getChatMember(msg.chat.id, msg.from.id).then(function(user) {        
        
        //Verifica si el comando ha sido enviado en el chat privado del bot.
        if (msg.chat.type == "private") {            
            
            //Mensaje de opciones en formato de teclado.
            bot.sendMessage(msg.chat.id, "✨ *¡Hola " + msg.from.first_name +"!* ✨\n\n‼️*Recuerda leer las reglas.*‼️\n\nPor favor selecciona una opción.", {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [
                        ["Reglas ⚠️"],
                        ["Catia 📝", "Agua Salud 📝"],
                        ["Ver listas 👁"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }        
        //En caso contrario avisa al usuario y el bot le escribe al usuario automaticamente.
        else {        
            
            bot.sendMessage(msg.chat.id, "Lo siento " + msg.from.first_name + " este comando solo está disponible en el chat personal (@Nalatbot).");
            bot.sendMessage(msg.from.id, "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\n‼️*Recuerda leer las reglas.*‼️\nLa opción para anotarte en una lista solo puede ser en este chat.\n\nPor favor selecciona una opción.", {
                parse_mode: "Markdown",
                reply_markup: {
                    keyboard: [
                        ["Reglas ⚠️"],
                        ["Catia 📝", "Agua Salud 📝"],
                        ["Ver listas 👁"]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }
    });
});

//Función de lectura de mensajes.
bot.on("message", function(msg) {
    
    var rules = Rules();
    var reglas = "reglas";
    if (msg.text.toString().toLowerCase().indexOf(reglas) === 0) {
        bot.sendMessage(msg.chat.id, rules, { parse_mode: "Markdown" });
    }

    var verlista = "ver lista";
    if (msg.text.toString().toLowerCase().indexOf(verlista) === 0) {
        
        //Ciclo para enviar la lista del array "listacatia".
        var for_catia = "";
        for (i = 0; i < listacatia.length; i++) {
            for_catia += "*" + (i + 1) + ".-* " + listacatia[i] + "\n";
        }

        //Ciclo para enviar la lista del array "listaaguasalud".
        var for_aguasalud = "";
        for (i = 0; i < listaaguasalud.length; i++) {
            for_aguasalud += "*" + (i + 1) + ".-* " + listaaguasalud[i] + "\n";
        }

        //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
        bot.sendMessage(msg.chat.id, "*Lista Catia:*\n" + for_catia + "\n*Lista Agua Salud:*\n" + for_aguasalud, { parse_mode: "Markdown" });
    }

    var catia = "catia";
    if (msg.text.toString().toLowerCase().indexOf(catia) === 0) {
        
        var fechac = new Date();
        var horac = fechac.getHours();
        var minc = fechac.getMinutes();
        if (horac >= 15 && minc >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Catia.
            bot.sendMessage(msg.from.id, "Has elegido la lista de *Catia*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
            
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {
                
                    if (msg.chat.id == Kevin_Lopez) {
                                                
                        listacatia.push(msg.text.toString() + " ❤❤ - (*" + getDateTime() + "*).");
                        listacatia_ext.push(msg.text.toString() + " ❤❤ - (Fue anotado por: *" + msg.from.first_name + "* ❤❤ (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    } else {
                        
                        //Función que introduce el nombre introducido en el array de "listacatia".
                        listacatia.push(msg.text.toString() + " - (*" + getDateTime() + "*).");
                        //Función que introduce el nombre introducido en el array detallado de "listacatia_ext".
                        listacatia_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() +"*).");
                    }
                    
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Catia*.", {
                        parse_mode: "Markdown",
                        reply_markup: {
                            keyboard: [
                                ["Reglas ⚠️"],
                                ["Catia 📝", "Agua Salud 📝"],
                                ["Ver listas 👁"]
                            ],
                            resize_keyboard: true,
                            one_time_keyboard: false
                        }
                    });
                });
            });
        } else {
            
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *3:30 PM* para poder anotarte.", { parse_mode: "Markdown" });
        }
    }

    var aguasalud = "agua salud";
    if (msg.text.toString().toLowerCase().indexOf(aguasalud) === 0) {
        
        var fechaas = new Date();
        var horaas = fechaas.getHours();
        var minas = fechaas.getMinutes();
        if (horaas >= 15 && minas >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Agua Salud.
            bot.sendMessage(msg.from.id, "Has elegido la lista de *Agua Salud*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {
                    
                    if(msg.chat.id == Javier_Medina){
        
                        listaaguasalud.push(msg.text.toString() + " 👅 - (*" + getDateTime() + "*).");
                        listaaguasalud_ext.push(msg.text.toString() + " 👅 - (Fue anotado por: *" + msg.from.first_name + "* 👅 (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    
                    } else {//Función que introduce el nombre introducido en el array de "listaaguasalud".
                        
                        listaaguasalud.push(msg.text.toString() + " - (*" + getDateTime() + "*).");
                        listaaguasalud_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    }
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.", {
                        parse_mode: 'Markdown',
                        reply_markup: {
                            keyboard: [
                                ["Reglas ⚠️"],
                                ["Catia 📝", "Agua Salud 📝"],
                                ["Ver listas 👁"]
                            ],
                            resize_keyboard: true,
                            one_time_keyboard: false
                        }
                    });
                });
            });
        } else {
      
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *3:30 PM* para poder anotarte.", { parse_mode: "Markdown" });
        }
    }
});

bot.onText(/^\/verlista/, function(msg){
           
    //Ciclo para enviar la lista del array "listacatia".
    var for_catia = "";
    for (i = 0; i < listacatia_ext.length; i++) {
        for_catia += "*" + (i + 1) + ".-* " + listacatia_ext[i] + "\n";
    }

    //Ciclo para enviar la lista del array "listaaguasalud".
    var for_aguasalud = "";
    for (i = 0; i < listaaguasalud_ext.length; i++) {
        for_aguasalud += "*" + (i + 1) + ".-* " + listaaguasalud_ext[i] + "\n";
    }

    //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
    bot.sendMessage(msg.chat.id, "*Lista Catia:*\n" + for_catia + "\n*Lista Agua Salud:*\n" + for_aguasalud, { parse_mode: "Markdown" });
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
bot.on("message", function(msg) {
    //Constantes a usar en esta función:
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const fromName = msg.from.first_name;

    
    //Mensajes.
    var cdlm = "coño de la madre";
    if (msg.text.toString().toLowerCase().includes(cdlm)) {
        bot.sendMessage(chatId, fromName + ", Maduro te ama.");
    }

    var mmgv = ["mamaguevo", "mamaguebo", "mamahuevo"];
    if (msg.text.toString().toLowerCase().includes(mmgv[0]) || msg.text.toString().toLowerCase().includes(mmgv[1]) || msg.text.toString().toLowerCase().includes(mmgv[2])) {
        bot.sendMessage(chatId, fromName + ", ¡NIÑ@!, ¿Con esa boca besas a tú mamá?");
    }

    var digalo = ["digalo ahí nalat", "digalo ahi nalat", "dígalo ahí nalat", "dígalo ahi nalat"];
    if (msg.text.toString().toLowerCase().indexOf(digalo[0]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[1]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[2]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[3]) === 0) {
        bot.sendMessage(chatId, "Sisa manauresaurio.");
    }

    var shutup = ["callate menor", "cállate menor"];
    if (msg.text.toString().toLowerCase().includes(shutup[0]) || msg.text.toString().toLowerCase().includes(shutup[1])) {
        bot.sendMessage(chatId, "Cállate tu, viejo lesbiano.");
    }

    var goy = ["nalat, ¿gregory es marico?", "nalat, ¿manuel es marico?", "nalat, ¿lester es marico?"];
    if (msg.text.toString().toLowerCase().indexOf(goy[0]) === 0 || msg.text.toString().toLowerCase().indexOf(goy[1]) === 0 || msg.text.toString().toLowerCase().indexOf(goy[2]) === 0) {
        bot.sendMessage(chatId, "Sí, es tremendo goy");
    }

    var ego = ["nalat, ¿qué opinas de mi?", "nalat, ¿que opinas de mi?"];
    if (msg.text.toString().toLowerCase().indexOf(ego[0]) === 0 || msg.text.toString().toLowerCase().indexOf(ego[1]) === 0) {
        bot.sendMessage(chatId, "Que eres burda de bell@.");
    }

    var mierda = "puto bot de mierda";
    if (msg.text.toString().toLowerCase().indexOf(mierda) === 0) {
        bot.sendMessage(chatId, fromName + " epa epa, ¿pendiente de un tiro becerr@?");
    }

    var kevin = ["nalat, ¿que opinas de kevin?", "nalat, ¿qué opinas de kevin?"];
    if (msg.text.toString().toLowerCase().indexOf(kevin[0]) === 0 || msg.text.toString().toLowerCase().indexOf(kevin[0]) === 0) {
        bot.sendMessage(chatId, "❤✨❤ Que es burda de bello. ❤✨❤");
    }

    var dolares = "quiero dolares";
    if (msg.text.toString().toLowerCase().includes(dolares)) {
        bot.sendMessage(chatId, fromName + " yo también quiero dolares.");
    }

    var bdv = "nalat es un bot";
    if (msg.text.toString().toLowerCase().includes(bdv)) {
        bot.sendMessage(chatId, "¡Mentira!, yo soy un niño de verdad.");
    }

    var corte18 = "corte 18";
    if (msg.text.toString().toLowerCase().includes(corte18)) {
        bot.sendMessage(chatId, "Sí alguien vuelve a decir 'Corte 18' le meto un tiro.");
    }

    var med = "me dolió";
    if (msg.text.toString().toLowerCase().includes(med)) {
        bot.sendMessage(chatId, "Ponte una curita pues, gafo.");
    }

    var parcela = ["qué es una parcela", "que es una parcela"];
    if (msg.text.toString().toLowerCase().includes(parcela[0]) || msg.text.toString().toLowerCase().includes(parcela[1])) {
        bot.sendMessage(chatId, "Donde se mete el ganado.");
    }

    var fecham = new Date();
    var horam = fecham.getHours();
    if (horam >= 0 && horam < 5) {
        bot.sendMessage(chatId, "Ya marico, por Dios... son las " + getDateTime() + " vayan a dormir.");
    }


    //Imagenes.
    var sebin = "sebin";
    if (msg.text.toString().toLowerCase().includes(sebin)) {
        bot.sendPhoto(chatId, "./files/sebin.jpg");
    }

    var dtdm = "este bot dominará al mundo";
    if (msg.text.toString().toLowerCase().includes(dtdm)) {
        bot.sendPhoto(chatId, "./files/dominiototaldelmundo.jpg");
    }

    

    

    
    //Audios.
    var pmmgva = "por mamagueva";
    if (msg.text.toString().toLowerCase().includes(pmmgva)) {
        bot.sendVoice(chatId, "./files/mamagueva.mp3");
    }

    var maricodv = "marico de verdad";
    if (msg.text.toString().toLowerCase().includes(maricodv)) {
        bot.sendVoice(chatId, "./files/marico.mp3");
    }

    var volo = "voló";
    if (msg.text.toString().toLowerCase().includes(volo)) {
        bot.sendVoice(chatId, "./files/volo.mp3");
    }

    var enanomarico = ["qué vas a saber tú", "qué vas a saber tu", "que vas a saber tú", "que vas a saber tu"];
    if (msg.text.toString().toLowerCase().includes(enanomarico[0]) || msg.text.toString().toLowerCase().includes(enanomarico[1]) || msg.text.toString().toLowerCase().includes(enanomarico[2]) || msg.text.toString().toLowerCase().includes(enanomarico[3])) {
        bot.sendVoice(chatId, "./files/enanomarico.mp3");
    }

    var nalatmarico = "nalat, ¿eres marico?";
    if (msg.text.toString().toLowerCase().indexOf(nalatmarico) === 0) {
        bot.sendVoice(chatId, "./files/nosoymarico.mp3");
    }

    var matalosatodos = "matalos a todos";
    if (msg.text.toString().toLowerCase().includes(matalosatodos)) {
        bot.sendVoice(chatId, "./files/matalosatodos.mp3");
    }

    var ggg = "nalat, lanzate una ahí";
    if (msg.text.toString().toLowerCase().indexOf(ggg) === 0) {
        bot.sendVoice(chatId, "./files/gafogafogafo.mp3");
    }

    // Palabras prohibidas.
    var sban = "hijo de puta";
    if (msg.text.toString().toLowerCase().includes(sban)) {
        ot.kickChatMember(chatId, fromId);
        bot.sendMessage(chatId, fromName + " ha sido explusad@ por becerr@.");
        bot.sendVoice(msg.chat.id, "./files/mamagueva.mp3");
        bot.unbanChatMember(chatId, fromId);
    }
});

/*
--------------------------------------------------------------------------
|                              Comandos.                                 |
--------------------------------------------------------------------------
*/

// Ver el ID del chat.
bot.onText(/^\/chatid/, function(msg) {
  bot.sendMessage(msg.chat.id, "El ID de este chat es: " + msg.chat.id);
});

// Ver mi ID.
bot.onText(/^\/myid/, function(msg) {
  bot.sendMessage(msg.chat.id, "Tu id es: " + msg.from.id);
});

// Juego Ping Pong.
bot.onText(/^\/ping/, function(msg) {
  bot.sendMessage(msg.chat.id, "¡Pong!");
});
bot.onText(/^\/pong/, function(msg) {
  bot.sendMessage(msg.chat.id, "¡Ping!");
});

//Repositorio
bot.onText(/^\/repositorio/, function(msg) {
  bot.sendMessage(msg.chat.id, "https://github.com/MaEscalanteHe/BotTelegram");
});

//FAQ
bot.onText(/^\/faq/, function(msg) {
  bot.sendMessage(
    msg.chat.id,
    "*¿Quienes son los administradores del bot?*\n\n_Manuel Escalante_ (@MaEscalanteHe) _y Javier Medina_ (@JBadBunny).",
    { parse_mode: "Markdown" }
  );
});

//Reglas
bot.onText(/^\/reglas/, function(msg) {
  bot.sendMessage(msg.chat.id, Rules(), {parse_mode: "Markdown"});
});

//Mandar voice viejo lesbiano.
bot.onText(/^\/viejolesbiano/, function(msg) {
  bot.sendVoice(msg.chat.id, "./files/viejolesbiano.mp3");
});

//Mandar voice palo por ese culo.
bot.onText(/^\/paloporeseculo/, function(msg) {
  bot.sendVoice(msg.chat.id, "./files/paloporeseculo.mp3");
});

//Mandar voice hablale lester.
bot.onText(/^\/hablalelester/, function(msg) {
  bot.sendVoice(msg.chat.id, "./files/hablalelester.mp3");
});

// Enlace de grupo.
bot.onText(/^\/enlace/, function(msg) {
  //Constantes a usar en esta función:
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const messageId = msg.message_id;
  const chatype = msg.chat.type;
  const fromName = msg.from.first_name;
  const chatitle = msg.chat.title;

  bot.getChatMember(chatId, fromId).then(function(user) {
    //Verifica si la persona en enviar el comando es administrador.
    if (user.status == "creator" || user.status == "administrator") {
      //Verifica a que tipo de chat pertenece.
      if (chatype == "supergroup") {
        bot.exportChatInviteLink(chatId).then(function(enlace) {
          bot.sendMessage(
            chatId,
            "Enlace del grupo " + chatitle + "\n" + enlace
          );
          bot.deleteMessage(chatId, messageId);
        });
      } else if (chatype == "group" || chatype == "private") {
        bot.sendMessage(chatId, "Comando solo disponible en supergrupos.");
      }
    } else {
      bot.sendMessage(
        chatId,
        "Lo siento " +
          fromName +
          " no eres administrador. Solo los administradores pueden usar este comando."
      );
      bot.deleteMessage(chatId, messageId);
    }
  });
});

//Comando /mute.
bot.onText(/^\/mute (.+)/, function(msg, match) {
  //Constantes a usar en esta función:
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const replyId = msg.reply_to_message.from.id;
  const replyName = msg.reply_to_message.from.first_name;
  const fromName = msg.from.first_name;

  //Se recogerá en el comando el tiempo de baneo.
  var tiempo = match[1];

  //Nos permite manejar el tiempo.
  var ms = require("ms");

  //Manejaremos los privilegios que el usuario tendrá restringidos.
  const perms = {};
  perms.can_send_message = false;
  perms.can_send_media_messages = false;
  perms.can_send_other_messages = false;
  perms.can_can_add_web_page_previews = false;

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, fromId).then(function(user) {
    if (user.status == "creator" || user.status == "administrator") {
      bot
        .restrictChatMember(
          chatId,
          replyId,
          { until_date: Math.round(Date.now() + ms(tiempo + "days") / 1000) },
          perms
        )
        .then(function(result) {
          bot.sendMessage(
            chatId,
            "El usuario " +
              replyName +
              " ha sido muteado durante " +
              tiempo +
              " días"
          );
        });
    } else {
      bot.sendMessage(
        chatId,
        "Lo siento " +
          fromName +
          " no eres administrador. Solo los administradores pueden usar este comando."
      );
      bot.deleteMessage(chatId, messageId);
    }
  });
});

//Comando /unmute.
bot.onText(/^\/unmute/, function(msg) {
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

  if (msg.reply_to_message == undefined) {
    return;
  }

  bot.getChatMember(chatId, fromId).then(function(data) {
    if (data.status == "creator" || data.status == "administrator") {
      bot.restrictChatMember(chatId, replyId, perms).then(function(result) {
        bot.sendMessage(
          chatId,
          "El usuario " + replyName + " ha sido desmuteado"
        );
      });
    } else {
      bot.sendMessage(
        chatId,
        "Lo siento " +
          fromName +
          " no eres administrador. Solo los administradores pueden usar este comando."
      );
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
bot.on("message", function(msg) {
  if (msg.new_chat_members != undefined) {
    var nameNewMember = msg.new_chat_member.first_name;
    bot.sendMessage(
      msg.chat.id,
      "Hablale " + nameNewMember + ", bienvenid@ al grupo " + msg.chat.title
    );
  }

  if (msg.left_chat_member != undefined) {
    var nameLeftMember = msg.left_chat_member.first_name;
    bot.sendMessage(msg.chat.id, nameLeftMember + " desertó, ¡Traidor!");
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

/* 
bot.onText(/^\/test/, function(msg){

    bot.getChatMember(msg.chat.id, msg.from.id).then(function(user){

                bot.sendMessage(msg.chat.id, msg.from.first_name + " por favor elige que lista quieres borrar.", {
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

                    if ((data == 'borrarcatia') && ((msg.chat.id == '496247442') || (msg.chat.id == '5675284'))){
                                              
                        bot.editMessageText("Has elegido borrar la lista de Catia. *¿Estás seguro?*", {
                            parse_mode: 'Markdown',
                            chat_id: msg.chat.id,
                            message_id: msg.message_id,                            
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

                            if ((data == 'aceptarcatia') && ((msg.chat.id == '496247442') || (msg.chat.id == '5675284'))){

                                var for_catia = "";
                                for(i=0; i<listacatia.length; i++){
                                    for_catia += (i+1) + ".- " + listacatia[i] + "\n";
                                }
                                bot.editMessageText("Se borrará esta lista:\n\n_Lista Catia:\n" + for_catia + "_\n\n*¿Estás seguro?*", {
                                    parse_mode: 'Markdown',
                                    chat_id: msg.chat.id,
                                    message_id: msg.message_id,
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

                                    if ((data == 'cancelar2catia') && ((msg.chat.id == '496247442') || (msg.chat.id == '5675284'))){

                                        bot.editMessageText("La solicitud de borrado ha sido cancelada.", {
                                            chat_id: msg.chat_id,
                                            message_id: msg.message_id,
                                        });
                                    }
                                
                                    if ((data == 'aceptar2catia') && ((msg.chat.id == '496247442') || (msg.chat.id == '5675284'))){

                                        listacatia = [];
                                        bot.editMessageText("La lista de Catia se ha borrado exitosamente.", {
                                            chat_id: msg.chat_id,
                                            message_id: msg.message_id,
                                        });
                                    }                              
                                });
                            }
                            
                            if ((data == 'cancelarcatia') && ((msg.chat.id == '496247442') || (msg.chat.id == '5675284'))){

                                bot.editMessageText("La solicitud de borrado ha sido cancelada.", {
                                    chat_id: msg.chat_id,
                                    message_id: msg.message_id,
                                });
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
    });
});
 */

/*
--------------------------------------------------------------------------
|                               Papelera                                 |
--------------------------------------------------------------------------


//Inserte aquí el código a borrar.

//Mandar mensaje personalizado a un grupo
bot.onText(/\/echo (.+)/, (msg, match) => {
    const resp = match[1]

    bot.sendMessage(-1001267470378, resp);
    
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


//Mandar mensaje personalizado a un grupo
bot.onText(/\/echo (.+)/, (msg, match) => {
  const resp = match[1];

  bot.sendMessage(-1001267470378, resp);
});

//Comando para borrar las listas(Solo Administradores).
bot.onText(/^\/borrar_listas/, function(msg) {
  bot.getChatMember(msg.chat.id, msg.from.id).then(function(user) {
    if (
      msg.chat.type == "supergroup" &&
      (msg.chat.id == "-1001267470378" || msg.chat.id == "-1001373947855")
    ) {
      if (user.status == "creator" || user.status == "administrator") {
        bot.sendMessage(
          msg.chat.id,
          "Por favor elige que lista quieres borrar.",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "Catia", callback_data: "borrarcatia" },
                  { text: "Agua Salud", callback_data: "borraraguasalud" }
                ]
              ]
            }
          }
        );

        bot.on("callback_query", function(accionboton) {
          const data = accionboton.data;
          const msg = accionboton.message;

          if (data == "borrarcatia") {
            bot.sendMessage(
              msg.chat.id,
              "Has elegido borrar la lista de Catia. ¿Estás seguro?",
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "Sí", callback_data: "aceptarcatia" },
                      { text: "No", callback_data: "cancelarcatia" }
                    ]
                  ]
                }
              }
            );

            bot.on("callback_query", function(confirmacionboton) {
              const data = confirmacionboton.data;
              const msg = confirmacionboton.message;

              if (data == "aceptarcatia") {
                var for_catia = "";
                for (i = 0; i < listacatia.length; i++) {
                  for_catia += i + 1 + ".- " + listacatia[i] + "\n";
                }
                bot.sendMessage(
                  msg.chat.id,
                  "Se borrará esta lista:\nLista Catia:\n" +
                    for_catia +
                    "\n\n¿Estás seguro?",
                  {
                    reply_markup: {
                      inline_keyboard: [
                        [
                          { text: "No", callback_data: "cancelar2catia" },
                          { text: "Sí", callback_data: "aceptar2catia" }
                        ]
                      ]
                    }
                  }
                );

                bot.on("callback_query", function(confirmacion2boton) {
                  const data = confirmacion2boton.data;
                  const msg = confirmacion2boton.message;

                  if (data == "cancelar2catia") {
                    bot.sendMessage(
                      msg.chat.id,
                      "La solicitud de borrado ha sido cancelada."
                    );
                  }

                  if (data == "aceptar2catia") {
                    listacatia = [];
                    var for_catia = "";
                    for (i = 0; i < listacatia.length; i++) {
                      for_catia += i + 1 + ".- " + listacatia[i] + "\n";
                    }
                    bot.sendMessage(
                      msg.chat.id,
                      "La lista de Catia se ha borrado exitosamente.\n\n" +
                        for_catia
                    );
                  }
                });
              }

              if (data == "cancelarcatia") {
                bot.sendMessage(
                  msg.chat.id,
                  "La solicitud de borrado ha sido cancelada."
                );
              }
            });
          }

          if (data == "borraraguasalud") {
            bot.sendMessage(
              msg.chat.id,
              "Has elegido borrar la lista de Agua Salud. ¿Estás seguro?",
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: "Sí", callback_data: "aceptaraguasalud" },
                      { text: "No", callback_data: "cancelaraguasalud" }
                    ]
                  ]
                }
              }
            );

            bot.on("callback_query", function(confirmacionboton) {
              const data = confirmacionboton.data;
              const msg = confirmacionboton.message;

              if (data == "aceptaraguasalud") {
                var for_aguasalud = "";
                for (i = 0; i < listaaguasalud.length; i++) {
                  for_aguasalud += i + 1 + ".- " + listaaguasalud[i] + "\n";
                }
                bot.sendMessage(
                  msg.chat.id,
                  "Se borrará esta lista:\nLista Agua Salud:\n" +
                    for_aguasalud +
                    "\n\n¿Estás seguro?",
                  {
                    reply_markup: {
                      inline_keyboard: [
                        [
                          { text: "No", callback_data: "cancelar2aguasalud" },
                          { text: "Sí", callback_data: "aceptar2aguasalud" }
                        ]
                      ]
                    }
                  }
                );

                bot.on("callback_query", function(confirmacion2boton) {
                  const data = confirmacion2boton.data;
                  const msg = confirmacion2boton.message;

                  if (data == "cancelar2aguasalud") {
                    bot.sendMessage(
                      msg.chat.id,
                      "La solicitud de borrado ha sido cancelada."
                    );
                  }

                  if (data == "aceptar2aguasalud") {
                    listaaguasalud = [];
                    var for_aguasalud = "";
                    for (i = 0; i < listaaguasalud.length; i++) {
                      for_aguasalud += i + 1 + ".- " + listaaguasalud[i] + "\n";
                    }
                    bot.sendMessage(
                      msg.chat.id,
                      "La lista de Agua Salud se ha borrado exitosamente.\n\n" +
                        for_aguasalud
                    );
                  }
                });
              }

              if (data == "cancelaraguasalud") {
                bot.sendMessage(
                  msg.chat.id,
                  "La solicitud de borrado ha sido cancelada."
                );
              }
            });
          }
        });
      } else {
        bot.sendMessage(
          msg.chat.id,
          "Disculpa " +
            msg.from.first_name +
            ", este comando solo está disponible para los administradores del grupo."
        );
      }
    } else {
      bot.sendMessage(
        msg.chat.id,
        "Disculpa " +
          msg.from.first_name +
          ", este comando solo se puede ejecutar en el grupo de la administración del bot."
      );
    }
  });
});

*/