// .signal(controller) ties several requests to one AbortController of your own
import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two requests share one controller: one Cancel stops both.' });
  const server = createServer(stage, {
    '/posts': () => ({ json: [], delay: stage.preview ? 1300 : 3500 }),
    '/users': () => ({ json: [], delay: stage.preview ? 1300 : 3500 }),
  });
  const tl = timeline(stage, server, { span: 3000, label: (_i, _m, path, status) => `${path} ${status}` });
  const log = pane(stage.root, 'What the app shows');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(AbortAddon());
  let controller = new AbortController();

  const send = (): void => {
    tl.reset();
    log.clear();
    // Your own controller: any number of requests can be given the same one.
    controller = new AbortController();
    for (const path of ['/posts', '/users']) {
      api
        .signal(controller)
        .get(path)
        .onAbort(() => {
          if (stage.disposed) return;
          log.add(`${path}: cancelled`, 'warn');
          stage.say('One controller.abort() stopped both requests', 'warn');
        })
        .json(() => {
          if (stage.disposed) return;
          log.add(`${path}: arrived`, 'ok');
          stage.say('Nobody cancelled, so both answers arrived', 'ok');
        })
        .catch(() => {});
    }
    stage.say('Two requests sent with the same controller');
  };
  const cancel = (): void => {
    tl.mark('abort()', 'warn');
    controller.abort();
  };

  if (stage.bar) {
    button(stage.bar, 'Send both', send);
    button(stage.bar, 'Cancel', cancel);
    send();
  } else {
    stage.play(async (wait) => {
      send();
      await wait(600);
      cancel();
      await wait(1500);
      send();
      await wait(2300);
    });
  }
  return () => stage.dispose();
};

export default mount;
