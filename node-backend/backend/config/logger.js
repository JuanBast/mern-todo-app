const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    level: process.env.LOGGER_LEVEL || 'info',
    // level: 'debug',
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(msg => `[${getPrettyTimestamp(msg.timestamp)}] [${msg.level.toUpperCase()}] - ${msg.message}`)
    ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/backend.log`
        }),
        new transports.Console()
    ]
})

function getPrettyTimestamp(timestamp){
    const date = timestamp.substring(0, 10);
    const time = timestamp.substring(11, timestamp.length - 1);

    return `${date} ${time}`
}