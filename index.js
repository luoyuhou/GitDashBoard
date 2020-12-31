import Koa from 'koa';
import Router from 'koa-router';
import config from './common/config'
import Logger from "./common/logger";


const app = new Koa();
const router = Router();
const logger = Logger({transports: { filename: './runtime/service.log', level: 'info'}});

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());

app.use(async ctx => {
    ctx.status = 200;
    ctx.body = 'cmd'
})

app.listen(3000, logger.info('running: http://localhost:3000'))
