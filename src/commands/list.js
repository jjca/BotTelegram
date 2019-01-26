'use strict';

const app = require('../settings/app');

// Horario en que se abre la lista
var listaabrehora = process.env.HORA;
var listaabreminutos = process.env.HORA_MINUTOS;

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

//Arrays de listas extendidas.
var listacatia_ext = [];
var listaavsucre_ext = [];

//ID's
const Kevin_Lopez = "790564315";
const Javier_Medina = "5675284";

app.bot.on('message', function(msg) {
    
    const reglas = "reglas";
    if (msg.text.toString().toLowerCase().indexOf(reglas) === 0) {
        app.bot.sendMessage(msg.chat.id, Rules(), { parse_mode: "Markdown" });
    }

    const hora = "hora";
    if (msg.text.toString().toLowerCase().indexOf(hora) === 0) {
        app.bot.sendMessage(msg.chat.id, Time(), { parse_mode: "Markdown" });
    }
    
    const verlista = "ver lista";
    if (msg.text.toString().toLowerCase().indexOf(verlista) === 0) {
        
        //Ciclo para enviar la lista del array "listacatia".
        let for_catia = "";
        for (let i = 0; i < listacatia.length; i++) {
            for_catia += "*" + (i + 1) + ".-* " + listacatia[i] + "\n";
        }

        //Ciclo para enviar la lista del array "listaavsucre".
        //listaavsucre = [...listaaguasalud, ...listaelsilencio, ...listalahoyada, ...listabellasartes, ...listaplazavenezuela];
        let for_avsucre = "";
        for (let i = 0; i < listaavsucre.length; i++) {
            for_avsucre += "*" + (i + 1) + ".-* " + listaavsucre[i] + "\n";
        }

        //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
        app.bot.sendMessage(msg.chat.id, "*Lista Catia:*\n" + for_catia + "\n*Lista Av Sucre:*\n" + for_avsucre, { parse_mode: "Markdown" });
    }

    const catia = "catia";
    if (msg.text.toString().toLowerCase().indexOf(catia) === 0) {
        
        let fechac = new Date();
        let horac = fechac.getHours();
        let minc = fechac.getMinutes();
        if (horac >= listaabrehora && minc >= listaabreminutos) {
            
            //Mensaje de solicitud de nombre para la lista de Catia.
            app.bot.sendMessage(msg.from.id, "Has elegido la lista de *Catia*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
            
                //Escucha de solicitud del nombre.
                app.bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {
                
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
                    app.bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Catia*.\n\n", {
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
            
            app.bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + `, debes esperar hasta las ${listaabrehora}:${listaabreminutos} para poder anotarte.\n\nHora del servidor: *` + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }

    const avsucre = "av sucre";
    if (msg.text.toString().toLowerCase().indexOf(avsucre) === 0) {
        
        let fechaas = new Date();
        let horaas = fechaas.getHours();
        let minas = fechaas.getMinutes();
        if (horaas >= listaabrehora && minas >= listaabreminutos) {
            
            //Mensaje de solicitud de nombre para la lista de Av Sucre.
            app.bot.sendMessage(msg.from.id, "Has elegido la lista de la *Av Sucre*.\nPor favor introduce tu nombre.", opts).then(function(sended) {
                
                //Escucha de solicitud del nombre.
                app.bot.onReplyToMessage(sended.chat.id, sended.message_id, function(msg) {
                    
                    if(msg.chat.id == Javier_Medina){
        
                        listaavsucre.push(msg.text.toString() + " 👅 - (*" + getDateTime() + "*).");
                        listaavsucre_ext.push(msg.text.toString() + " 👅 - (Fue anotado por: *" + msg.from.first_name + "* 👅 (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    
                    } else {
                        
                        //Función que introduce el nombre introducido en el array de "listaavsucre".                        
                        listaavsucre.push(msg.text.toString() + " - (*" + getDateTime() + "*).");
                        listaavsucre_ext.push(msg.text.toString() + " - (Fue anotado por: *" + msg.from.first_name + "* (_" + msg.from.id + "_) a las: *" + getDateTime() + "*).");
                    }
                    //Mensaje de opciones.
                    app.bot.sendMessage(msg.chat.id, "Ha sido anotad@ en la lista de *Agua Salud*.\n", {
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
      
            app.bot.sendMessage(msg.from.id, "Lo siento " + msg.from.first_name + `, debes esperar hasta las ${listaabrehora}:${listaabreminutos} para poder anotarte.\n\nHora del servidor: *` + getDateTime() + "*.", { parse_mode: "Markdown" });
        }
    }
});

app.bot.onText(/^\/verlistas$/, function(msg){
           
    //Ciclo para enviar la lista del array "listacatia".
    let for_catia = "";
    for (let i = 0; i < listacatia_ext.length; i++) {
        for_catia += "*" + (i + 1) + ".-* " + listacatia_ext[i] + "\n";
    }

    //Ciclo para enviar la lista del array "listaavsucre".
    //listaavsucre_ext = [...listaaguasalud_ext, ...listaelsilencio_ext, ...listalahoyada_ext, ...listabellasartes_ext, ...listaplazavenezuela_ext];
    let for_avsucre = "";
    for (let i = 0; i < listaavsucre_ext.length; i++) {
        for_avsucre += "*" + (i + 1) + ".-* " + listaavsucre_ext[i] + "\n";
    }

    //Mensaje que se envia una vez se hayan ordenado los objetos de los arrays.
    app.bot.sendMessage(msg.chat.id, "*Lista Catia:*\n" + for_catia + "\n*Lista Agua Salud:*\n" + for_avsucre, { parse_mode: "Markdown" });
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

// Mensaje de reglas.
function Rules() {
    
    const title = "⚠️ *Reglas para el uso de las listas digitales Catia/AvSucre* ⚠️";
    const rule1 = "1️⃣ Al momento de anotarse en las listas colocar su *Nombre* y *Apellido*, de lo contrario será omitido a la hora de abordar el bus.";
    const rule2 = "2️⃣ *Evitar* anotar a más de dos personas en un mismo dispositivo. En caso de hacerlo, de forma consecutiva, la tercera persona será omitida de la lista.";
    const rule3 = "3️⃣ Recordar que el transporte es de empleados y los mismos tienen prioridad al momento de abordar el bus, por tanto si quedan empleados de pie los últimos de la lista deben ceder el puesto.";
    const rule4 = "4️⃣ ...";

    return `${title}\n\n${rule1}\n\n${rule2}\n\n${rule3}\n\n${rule4}`;
}

// Mensaje de tiempo.
function Time() {

    const msg = "La hora actual del servidor es:";

    return `${msg} *${getDateTime()}*`;
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