//API Telegram.
const TelegramBot = require("node-telegram-bot-api");

//Token proporcionado por FatherBot en Telegram.
const token = process.env.TELEGRAM_TOKEN;

// El bot usa 'polling' para obtener actualizaciones.
const bot = new TelegramBot(token, { polling: true });
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


//Mensajes Importantes de /avisos
function Warning(){

    const title = "‼️‼️Importante‼️‼️\n\n";
    const OP = "El orden de prioridad de la lista de la Av Sucre ha sido removida.\n";
    const P1 = "Esto por petición de *Dirección de Transporte*\n";
    const P2 = "Para más información hablar con @MaEscalanteHe";
    
    return title + OP + P1 + P2;
}

//Mensaje Principal
function Welcome(){

    const title = "‼️*Recuerda tres cosas:*‼️";
    const W1 = "1️⃣ Leer las /reglas.";
    const W2 = "2️⃣ Leer de vez en cuando los avisos con: /avisos.";
    const W3 = "3️⃣ Estar en el Amper a las *4:00 PM* para pasar la lista antes de que llegue el bus.";
    const SO = "*Por favor selecciona una opción:*";

    return `${title}\n\n${W1}\n\n${W2}\n\n${W3}\n\n${SO}`;
}

//Función de reglas.
function Rules() {
    
    const title = "⚠️ *Reglas para el uso de las listas digitales Catia/AvSucre* ⚠️";
    const rule1 = "1️⃣ Al momento de anotarse en las listas colocar su *Nombre* y *Apellido*, de lo contrario será omitido a la hora de abordar el bus.";
    const rule2 = "2️⃣ *Evitar* anotar a más de dos personas en un mismo dispositivo. En caso de hacerlo, de forma consecutiva, la tercera persona será omitida de la lista.";
    const rule3 = "3️⃣ Recordar que el transporte es de empleados y los mismos tienen prioridad al momento de abordar el bus, por tanto si quedan empleados de pie los últimos de la lista deben ceder el puesto.";
    const rule4 = "4️⃣ ...";

    return `${title}\n\n${rule1}\n\n${rule2}\n\n${rule3}\n\n${rule4}`;
}

//Time
function Time() {

    const msg = "La hora actual del servidor es:";

    return `${msg} *${getDateTime()}*`;
}

//FAQ
function Faq() {

    const title = "📊 *Preguntas Frecuentes* 📊";
    const Q1 = "*¿Quienes son los administradores del bot?*";
    const A1 = "▫️_Manuel Escalante_ (@MaEscalanteHe).\n▪_Manuel Rodriguez_ (@ManuelitoD).\n▪_Javier Medina_ (@JBadBunny).";
    const Q2 = "*¿Cómo puedo ver el código del bot?*";
    const A2 = "_Usando el comando_ /repositorio.";

    return `${title}\n\n${Q1}\n${A1}\n\n${Q2}\n${A2}`;
}

//Comandos
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

//Grupos
function Groups() {

    const title = "⌨️ *Grupos de Telegram* ⌨️";
    const GC = "*Grupo de Catia:*\n⚠️ Unirse bajo su propio riesgo, puro desmadre ⚠️.";
    const LC = "[Los Bendecidos de Catia](https://t.me/LosBendecidosdeCatia)";
    const GAS = "*Grupo de Av Sucre:*";
    const LAS = "[AvSucre](https://t.me/AvSucre)";
    
    return `${title}\n\n${GC}\n${LC}\n\n${GAS}\n${LAS}`;
}

//Función de tiempo
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

//Objeto que habilita la opcion de responder mensaje por defecto.
var opts = {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify({
        force_reply: true
    })
};

//Arrays de listas básicas.
var listacatia = [];
var listaavsucre = [];
//var listaaguasalud = [];
//var listaelsilencio = [];
//var listalahoyada = [];
//var listabellasartes = [];
//var listaplazavenezuela = [];

//Arrays de listas extendidas.
var listacatia_ext = [];
var listaavsucre_ext = [];
//var listaaguasalud_ext = [];
//var listaelsilencio_ext = [];
//var listalahoyada_ext = [];
//var listabellasartes_ext = [];
//var listaplazavenezuela_ext = [];

//ID's
const Kevin_Lopez = "790564315";
const Javier_Medina = "5675284";

//Comando /start que inicia la funcionalidad principal del bot.
bot.onText(/^\/start$/, function(msg) {    
    
    bot.getChatMember(msg.chat.id, msg.from.id).then(function(user) {        
        
        //Verifica si el comando ha sido enviado en el chat privado del bot.
        if (msg.chat.type == "private") {            
            
            //Mensaje de opciones en formato de teclado.
            bot.sendMessage(msg.chat.id,  "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\n" + Welcome(), {
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
            
            bot.sendMessage(msg.chat.id, "Lo siento " + msg.from.first_name + " este comando solo está disponible en el chat personal (@Nalatbot).");
            bot.sendMessage(msg.from.id, "✨ *¡Hola " + msg.from.first_name + "!* ✨\n\nLa opción para anotarte en una lista solo puede ser en este chat.\n\n" + Welcome(), {
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

//Función de lectura de mensajes.
bot.on('message', function(msg) {
    
    const reglas = "reglas";
    if (msg.text.toString().toLowerCase().indexOf(reglas) === 0) {
        bot.sendMessage(msg.chat.id, Rules(), { parse_mode: "Markdown" });
    }

    const hora = "hora";
    if (msg.text.toString().toLowerCase().indexOf(hora) === 0) {
        bot.sendMessage(msg.chat.id, Time(), { parse_mode: "Markdown" });
    }
    
    const verlista = "ver lista";
    if (msg.text.toString().toLowerCase().indexOf(verlista) === 0) {
        
        //Ciclo para enviar la lista del array "listacatia".
        let for_catia = "";
        for (i = 0; i < listacatia.length; i++) {
            for_catia += "*" + (i + 1) + ".-* " + listacatia[i] + "\n";
        }

        //Ciclo para enviar la lista del array "listaavsucre".
        //listaavsucre = [...listaaguasalud, ...listaelsilencio, ...listalahoyada, ...listabellasartes, ...listaplazavenezuela];
        let for_avsucre = "";
        for (i = 0; i < listaavsucre.length; i++) {
            for_avsucre += "*" + (i + 1) + ".-* " + listaavsucre[i] + "\n";
        }

        //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
        bot.sendMessage(msg.chat.id, "*Lista Catia:*\n" + for_catia + "\n*Lista Av Sucre:*\n" + for_avsucre, { parse_mode: "Markdown" });
    }

    const catia = "catia";
    if (msg.text.toString().toLowerCase().indexOf(catia) === 0) {
        
        let fechac = new Date();
        let horac = fechac.getHours();
        let minc = fechac.getMinutes();
        if (horac >= 13 && minc >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Catia.
            bot.sendMessage(msg.from.id, "Has elegido la lista de *Catia*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
            
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {
                
                    if (msg.chat.id == Kevin_Lopez) {
                                                
                        listacatia.push(msg.text.toString() + " ❤❤❤ - (*" + getDateTime() + "*).");
                        listacatia_ext.push(msg.text.toString() + " ❤❤❤ - (Fue anotado por: *" + msg.from.first_name + "* ❤❤ (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    } else {
                        
                        //Función que introduce el nombre introducido en el array de "listacatia".
                        listacatia.push(msg.text.toString() + " - (*" + getDateTime() + "*).");
                        //Función que introduce el nombre introducido en el array detallado de "listacatia_ext".
                        listacatia_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() +"*).");
                    }
                    
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Catia*.\n\n", {
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
                });
            });
        } else {
            
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *11:30 PM* para poder anotarte.\n\nHora del servidor: *" + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

	/*   
    const avsucre = "av sucre";
    if (msg.text.toString().toLowerCase().indexOf(avsucre) === 0) {

        //Mensaje de solicitud de parada.
        bot.sendMessage(msg.from.id, "Has elegido la lista de la *Av Sucre*.\nPor favor introduce la parada donde te vas a bajar.", {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ["Agua Salud 📝"],
                    ["El Silencio 📝", "La Hoyada 📝"],
                    ["Bellas Artes 📝", "Plaza Venezuela 📝"],
                    ["Volver atrás ◀️"]
                ],
                resize_keyboard: true,
                one_time_keyboard: false
            }
        });
    }
	*/

    const avsucre = "av sucre";
    if (msg.text.toString().toLowerCase().indexOf(avsucre) === 0) {
        
        let fechaas = new Date();
        let horaas = fechaas.getHours();
        let minas = fechaas.getMinutes();
        if (horaas >= 13 && minas >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Av Sucre.
            bot.sendMessage(msg.from.id, "Has elegido la lista de la *Av Sucre*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {
                    
                    if(msg.chat.id == Javier_Medina){
        
                        listaavsucre.push(msg.text.toString() + " 👅 - (*" + getDateTime() + "*).");
                        listaavsucre_ext.push(msg.text.toString() + " 👅 - (Fue anotado por: *" + msg.from.first_name + "* 👅 (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    
                    } else {
                        
                        //Función que introduce el nombre introducido en el array de "listaavsucre".                        
                        listaavsucre.push(msg.text.toString() + " - (*" + getDateTime() + "*).");
                        listaavsucre_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    }
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.\n" + Warning(), {
                        parse_mode: 'Markdown',
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
                });
            });
        } else {
      
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *11:30 PM* para poder anotarte.\n\nHora del servidor: *" + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

	/*
    const elsilencio = "el silencio";
    if (msg.text.toString().toLowerCase().indexOf(elsilencio) === 0) {
        
        let fechaes = new Date();
        let horaes = fechaes.getHours();
        let mines = fechaes.getMinutes();
        if (horaes >= 15 && mines >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Av Sucre.
            bot.sendMessage(msg.from.id, "Has elegido la parada de *El Silencio*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {               
                            
                    listaelsilencio.push(msg.text.toString() + " - (*" + getDateTime() + " - ES*).");
                    listaelsilencio_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "* - *El Silencio*).");
                    
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.", {
                        parse_mode: 'Markdown',
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
                });
            });
        } else {
      
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *3:30 PM* para poder anotarte.\n\nHora del servidor: *" + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

    const lahoyada = "la hoyada";
    if (msg.text.toString().toLowerCase().indexOf(lahoyada) === 0) {
        
        let fechalh = new Date();
        let horalh = fechalh.getHours();
        let minlh = fechalh.getMinutes();
        if (horalh >= 15 && minlh >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Av Sucre.
            bot.sendMessage(msg.from.id, "Has elegido la parada de *La Hoyada*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {               
                            
                    listalahoyada.push(msg.text.toString() + " - (*" + getDateTime() + " - LH*).");
                    listalahoyada_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "* - *La Hoyada*).");
                    
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.", {
                        parse_mode: 'Markdown',
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
                });
            });
        } else {
      
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *3:30 PM* para poder anotarte.\n\nHora del servidor: *" + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

    const bellasartes = "bellas artes";
    if (msg.text.toString().toLowerCase().indexOf(bellasartes) === 0) {
        
        let fechaba = new Date();
        let horaba = fechaba.getHours();
        let minba = fechaba.getMinutes();
        if (horaba >= 15 && minba >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Av Sucre.
            bot.sendMessage(msg.from.id, "Has elegido la parada de *Bellas Artes*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {               
                            
                    listabellasartes.push(msg.text.toString() + " - (*" + getDateTime() + " - BA*).");
                    listabellasartes_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "* - *Bellas Artes*).");
                    
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.", {
                        parse_mode: 'Markdown',
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
                });
            });
        } else {
      
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *3:30 PM* para poder anotarte.\n\nHora del servidor: *" + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

    const plazavenezuela = "plaza venezuela";
    if (msg.text.toString().toLowerCase().indexOf(plazavenezuela) === 0) {
        
        let fechapv = new Date();
        let horapv = fechapv.getHours();
        let minpv = fechapv.getMinutes();
        if (horapv >= 15 && minpv >= 30) {
            
            //Mensaje de solicitud de nombre para la lista de Av Sucre.
            bot.sendMessage(msg.from.id, "Has elegido la parada de *Plaza Venezuela*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {               
                            
                    listaplazavenezuela.push(msg.text.toString() + " - (*" + getDateTime() + " - PV*).");
                    listaplazavenezuela_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "* - *Plaza Venezuela*).");
                    
                    //Mensaje de opciones.
                    bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.", {
                        parse_mode: 'Markdown',
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
                });
            });
        } else {
      
            bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + ", debes esperar hasta las *3:30 PM* para poder anotarte.\n\nHora del servidor: *" + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

    const volver = "volver atrás";
    if (msg.text.toString().toLowerCase().indexOf(volver) === 0) {

        //Mensaje predeterminado.
        bot.sendMessage(msg.from.id, "*Por favor selecciona una opción:*", {
            parse_mode: 'Markdown',
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
	*/

});


bot.onText(/^\/verlistas$/, function(msg){
           
    //Ciclo para enviar la lista del array "listacatia".
    let for_catia = "";
    for (i = 0; i < listacatia_ext.length; i++) {
        for_catia += "*" + (i + 1) + ".-* " + listacatia_ext[i] + "\n";
    }

    //Ciclo para enviar la lista del array "listaavsucre".
    //listaavsucre_ext = [...listaaguasalud_ext, ...listaelsilencio_ext, ...listalahoyada_ext, ...listabellasartes_ext, ...listaplazavenezuela_ext];
    let for_avsucre = "";
    for (i = 0; i < listaavsucre_ext.length; i++) {
        for_avsucre += "*" + (i + 1) + ".-* " + listaavsucre_ext[i] + "\n";
    }

    //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
    bot.sendMessage(msg.chat.id, "*Lista Catia:*\n" + for_catia + "\n*Lista Agua Salud:*\n" + for_avsucre, { parse_mode: "Markdown" });
});

//FAQ
bot.onText(/^\/faq$/, function(msg) {
    bot.sendMessage(msg.chat.id, Faq(), { parse_mode: "Markdown" });
});
  
//Reglas
bot.onText(/^\/reglas$/, function(msg) {
    bot.sendMessage(msg.chat.id, Rules(), { parse_mode: "Markdown" });
});

//Comandos
bot.onText(/^\/comandos$/, function(msg) {
    bot.sendMessage(msg.chat.id, Commands(), { parse_mode: "Markdown" });
});

//Grupos
bot.onText(/^\/grupos$/, function(msg) {
    bot.sendMessage(msg.chat.id, Groups(), { disable_web_page_preview: true, parse_mode: "Markdown" });
});

//Hora
bot.onText(/^\/hora$/, function(msg) {
    bot.sendMessage(msg.chat.id, `La hora es: *${getDateTime()}*`, { parse_mode: "Markdown" });
});

bot.onText(/^\/avisos$/, function(msg) {
    bot.sendMessage(msg.chat.id, Warning(), { parse_mode: "Markdown"});
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
    const cdlm = "coño de la madre";
    if (msg.text.toString().toLowerCase().includes(cdlm)) {
        bot.sendMessage(chatId, fromName + ", Maduro te ama.");
    }

    const mmgv = ["mamaguevo", "mamaguebo", "mamahuevo"];
    if (msg.text.toString().toLowerCase().includes(mmgv[0]) || msg.text.toString().toLowerCase().includes(mmgv[1]) || msg.text.toString().toLowerCase().includes(mmgv[2])) {
        bot.sendMessage(chatId, fromName + ", ¡NIÑ@!, ¿Con esa boca besas a tú mamá?");
    }

    const digalo = ["digalo ahí nalat", "digalo ahi nalat", "dígalo ahí nalat", "dígalo ahi nalat"];
    if (msg.text.toString().toLowerCase().indexOf(digalo[0]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[1]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[2]) === 0 || msg.text.toString().toLowerCase().indexOf(digalo[3]) === 0) {
        bot.sendMessage(chatId, "Sisa manauresaurio.");
    }

    const shutup = ["callate menor", "cállate menor"];
    if (msg.text.toString().toLowerCase().includes(shutup[0]) || msg.text.toString().toLowerCase().includes(shutup[1])) {
        bot.sendMessage(chatId, "Cállate tu, viejo lesbiano.");
    }

    const goy = ["nalat, ¿gregory es marico?", "nalat, ¿manuel es marico?", "nalat, ¿lester es marico?"];
    if (msg.text.toString().toLowerCase().indexOf(goy[0]) === 0 || msg.text.toString().toLowerCase().indexOf(goy[1]) === 0 || msg.text.toString().toLowerCase().indexOf(goy[2]) === 0) {
        bot.sendMessage(chatId, "Sí, es tremendo goy");
    }

    const ego = ["nalat, ¿qué opinas de mi?", "nalat, ¿que opinas de mi?"];
    if (msg.text.toString().toLowerCase().indexOf(ego[0]) === 0 || msg.text.toString().toLowerCase().indexOf(ego[1]) === 0) {
        bot.sendMessage(chatId, "Que eres burda de bell@.");
    }

    const mierda = "puto bot de mierda";
    if (msg.text.toString().toLowerCase().includes(mierda)) {
        bot.sendMessage(chatId, fromName + " epa epa, ¿pendiente de un tiro becerr@?");
    }

    const kevin = ["nalat, ¿que opinas de kevin?", "nalat, ¿qué opinas de kevin?"];
    if (msg.text.toString().toLowerCase().indexOf(kevin[0]) === 0 || msg.text.toString().toLowerCase().indexOf(kevin[1]) === 0) {
        bot.sendMessage(chatId, "❤✨❤ Que es burda de bello. ❤✨❤");
    }

    const dolares = "quiero dolares";
    if (msg.text.toString().toLowerCase().includes(dolares)) {
        bot.sendMessage(chatId, fromName + " yo también quiero dolares.");
    }

    const bdv = "nalat es un bot";
    if (msg.text.toString().toLowerCase().includes(bdv)) {
        bot.sendMessage(chatId, "¡Mentira!, yo soy un niño de verdad.");
    }

    const corte18 = "corte 18";
    if (msg.text.toString().toLowerCase().includes(corte18)) {
        bot.sendMessage(chatId, "Sí alguien vuelve a decir 'Corte 18' le meto un tiro.");
    }

    const med = "me dolió";
    if (msg.text.toString().toLowerCase().includes(med)) {
        bot.sendMessage(chatId, "Ponte una curita pues, gafo.");
    }

    const parcela = ["qué es una parcela", "que es una parcela"];
    if (msg.text.toString().toLowerCase().includes(parcela[0]) || msg.text.toString().toLowerCase().includes(parcela[1])) {
        bot.sendMessage(chatId, "Donde se mete el ganado.");
    }

    

    //Imagenes.
    const sebin = "sebin";
    if (msg.text.toString().toLowerCase().includes(sebin)) {
        bot.sendPhoto(chatId, "./files/sebin.jpg");
    }

    const dtdm = "este bot dominará al mundo";
    if (msg.text.toString().toLowerCase().includes(dtdm)) {
        bot.sendPhoto(chatId, "./files/dominiototaldelmundo.jpg");
    }


    
    //Audios.
    const pmmgva = "por mamagueva";
    if (msg.text.toString().toLowerCase().includes(pmmgva)) {
        bot.sendVoice(chatId, "./files/mamagueva.mp3");
    }

    const maricodv = "marico de verdad";
    if (msg.text.toString().toLowerCase().includes(maricodv)) {
        bot.sendVoice(chatId, "./files/marico.mp3");
    }

    const volo = "voló";
    if (msg.text.toString().toLowerCase().includes(volo)) {
        bot.sendVoice(chatId, "./files/volo.mp3");
    }

    const enanomarico = ["qué vas a saber tú", "qué vas a saber tu", "que vas a saber tú", "que vas a saber tu"];
    if (msg.text.toString().toLowerCase().includes(enanomarico[0]) || msg.text.toString().toLowerCase().includes(enanomarico[1]) || msg.text.toString().toLowerCase().includes(enanomarico[2]) || msg.text.toString().toLowerCase().includes(enanomarico[3])) {
        bot.sendVoice(chatId, "./files/enanomarico.mp3");
    }

    const nalatmarico = "nalat, ¿eres marico?";
    if (msg.text.toString().toLowerCase().indexOf(nalatmarico) === 0) {
        bot.sendVoice(chatId, "./files/nosoymarico.mp3");
    }

    const matalosatodos = "matalos a todos";
    if (msg.text.toString().toLowerCase().includes(matalosatodos)) {
        bot.sendVoice(chatId, "./files/matalosatodos.mp3");
    }

    const ggg = "nalat, lanzate una ahí";
    if (msg.text.toString().toLowerCase().indexOf(ggg) === 0) {
        bot.sendVoice(chatId, "./files/gafogafogafo.mp3");
    }

    const estudiar = "vamos a estudiar";
    if (msg.text.toString().toLowerCase().includes(estudiar)) {
        bot.sendVoice(chatId, "./files/vamosaestudiar.mp3");
    }

    const meca = "es la meca de la irreverencia";
    if (msg.text.toString().toLowerCase().indexOf(meca) === 0) {
        bot.sendVoice(chatId, "./files/eslamecadelairreverencia.mp3");
    }



    //Videonota
    const flavio = "flavio";
    if (msg.text.toString().toLowerCase().includes(flavio)) {
        bot.sendVideoNote(chatId, "./files/flavio.mp4");
    }



    // Palabras prohibidas.
    const sban = "hijo de puta";
    if (msg.text.toString().toLowerCase().includes(sban)) {
        bot.kickChatMember(chatId, fromId);
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
--------------------------------------------------------------------------
|                               Papelera                                 |
--------------------------------------------------------------------------
*/

//Inserte aquí el código a borrar.
