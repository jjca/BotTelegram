// Gestion del bot.
const app = require('./src/settings/app');
const error = require('./src/settings/log_error');

// Funcionalidades.
const start = require('./src/commands/start');
const messages = require('./src/commands/messages');
const audio = require('./src/commands/audios');
const images = require('./src/commands/images');
const videos = require('./src/commands/videos');
const progeso_ano = require('./src/commands/progreso_ano');