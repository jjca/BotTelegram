'use strict';

// Mensaje Principal.
let welcome = Welcome();
function Welcome() {
    const title = "‼️*Recuerda tres cosas:*‼️";
    const W1 = "1️⃣ Leer las /reglas.";
    const W2 = "2️⃣ Leer de vez en cuando los avisos con: /avisos.";
    const W3 = "3️⃣ Estar en el Amper a las *4:00 PM* para pasar la lista antes de que llegue el bus.";
    const SO = "*Por favor selecciona una opción:*";

    return `${title}\n\n${W1}\n\n${W2}\n\n${W3}\n\n${SO}`;
}

// Mensaje de reglas.
let rules = Rules();
function Rules() {
    
    const title = "⚠️ *Reglas para el uso de las listas digitales Catia/AvSucre* ⚠️";
    const rule1 = "1️⃣ Al momento de anotarse en las listas colocar su *Nombre* y *Apellido*, de lo contrario será omitido a la hora de abordar el bus.";
    const rule2 = "2️⃣ *Evitar* anotar a más de dos personas en un mismo dispositivo. En caso de hacerlo, de forma consecutiva, la tercera persona será omitida de la lista.";
    const rule3 = "3️⃣ Recordar que el transporte es de empleados y los mismos tienen prioridad al momento de abordar el bus, por tanto si quedan empleados de pie los últimos de la lista deben ceder el puesto.";
    const rule4 = "4️⃣ ...";

    return `${title}\n\n${rule1}\n\n${rule2}\n\n${rule3}\n\n${rule4}`;
}

// Mensaje de tiempo.
let time = Time();
function Time() {

    const msg = "La hora actual del servidor es:";

    return `${msg} *${getDateTime()}*`;
}

// Mensaje de preguntas frecuentes.
let faq = Faq();
function Faq() {

    const title = "📊 *Preguntas Frecuentes* 📊";
    const Q1 = "*¿Quienes son los administradores del bot?*";
    const A1 = "▫️_Manuel Escalante_ (@MaEscalanteHe).\n▪_Manuel Rodriguez_ (@ManuelitoD).\n▪_Javier Medina_ (@JBadBunny).";
    const Q2 = "*¿Cómo puedo ver el código del bot?*";
    const A2 = "_Usando el comando_ /repositorio.";

    return `${title}\n\n${Q1}\n${A1}\n\n${Q2}\n${A2}`;
}

// Mensaje de comandos disponibles.
let commands = Commands();
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

// Mensaje de grupos.
let groups = Groups();
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



// Modulos exportados.
module.exports = {welcome}