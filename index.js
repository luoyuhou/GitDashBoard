import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import moment from 'moment';
import path from 'path';
import './common/config'
import router from './routers/router';
import Logger from "./common/logger";

const cors = require('koa2-cors');

const app = new Koa();
app.use(cors());

const staticFiles = require('koa-static');
app.use(staticFiles(path.join(__dirname , 'static')));

const logger = Logger({transports: { filename: './runtime/logs/service.log', level: 'info'}});
const { SERVER_PORT: port, SOCKET_PORT: socket_port } = process.env;
app.use(bodyParser());

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    logger.info(`[${moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS')}] ${ctx.method} ${ctx.url} - ${rt}`)
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());

app.listen(port, logger.info(`[${moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS")}] running: http://localhost:${port}`));
