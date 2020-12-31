import winston from 'winston';

export default function logger({transports, level = 'info', format = winston.format.json(), defaultMeta = { service: 'user-service' }}){
    return winston.createLogger({
        level,
        format,
        defaultMeta,
        transports: [
            new winston.transports.File({
                filename: transports.filename,
                level: transports.level
            })
        ]
    })
}