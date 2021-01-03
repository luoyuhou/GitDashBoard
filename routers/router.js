import Router from 'koa-router';
import loader from '../common/loader';

const router = new Router();

/**
 * loader = { controller: { action: a1, action: a2 }, c2 : {...}}
 */
router.get('/home', async (ctx, next) => await loader.home.index(ctx, next));
router.get('/git', async (ctx, next) => await loader.git.index(ctx, next));
router.post('/git', async (ctx, next) => await loader.git.execute(ctx, next));


export default router;