const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`
}))

const userLogger = createLogger({
    format: customFormat,
    transports: [
        new transports.File({
            filename: 'user.log',
            level: 'info'
        }),
        new transports.File({
            filename: 'user-error.log',
            level: 'error'
        })
    ]
});

const logger = createLogger({
    format: customFormat,
    transports: [
        new transports.Console( {level : 'silly'}),
        new transports.File({ filename : 'app.log', level:'info'})
    ]
});

module.exports = logger;
module.exports = userLogger;