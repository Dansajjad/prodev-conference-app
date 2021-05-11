import Router from '@koa/router';
import { router as swaggerRouter } from './swagger.mjs';
import { router as attendeesRouter } from './attendees.mjs';

export const router = new Router();

router.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());
router.use('/api', attendeesRouter.routes(), attendeesRouter.allowedMethods());
