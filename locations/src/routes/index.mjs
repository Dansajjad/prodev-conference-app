import Router from '@koa/router';
import { router as locationsRouter } from './locations.mjs';

export const router = new Router();

router.use('/api', locationsRouter.routes(), locationsRouter.allowedMethods());
