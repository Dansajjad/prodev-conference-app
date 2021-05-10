import Router from '@koa/router';
import { router as eventsRouter } from './events.mjs';

export const router = new Router();

router.use('/api', eventsRouter.routes(), eventsRouter.allowedMethods());

