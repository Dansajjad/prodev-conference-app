import Router from '@koa/router';
import boom from '@hapi/boom';

const DEFAULT_HASH = '$2a$10$QlWNohhjpbGuty6UnyeeJOeKY6dKbiaoFxeWdOoIUiNYaO/ZD2khW';

export const router = new Router({
  prefix: '/flakyService',
});

const delayInitValue = 20;
let delay = delayInitValue;

// reset delay every 20 seconds
setInterval(() => {
  if (delay !== delayInitValue) {
    delay = delayInitValue;
    console.log("Resetting flaky service delay to", delay);
  }
}, 20000);

router.get("/", async ctx => {
  console.log("Flaky service delay", delay);
  // if we're really slowing down, just reply with an error
  if (delay > 1000) {
    console.log("Long delay encountered, returning Error 423 (Locked)");
    const {
      output: { statusCode, payload },
    } = boom.locked("Flaky service is flaky");
    ctx.status = statusCode;
    ctx.body = payload;
    return;
  }

  setTimeout(() => {
    console.log("Replying with flaky response after delay of", delay);
    delay = delay * 2;
    ctx.body = {
      body: "Flaky service response",
      delay,
    };
  }, delay);
});
