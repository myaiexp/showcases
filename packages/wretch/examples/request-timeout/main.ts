// .setTimeout() cuts a request that is slower than its deadline
import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change how long the server takes, then send. The deadline is 1 second.' });
  const server = createServer(stage, { '/report': () => ({ json: { rows: 120 } }) });
  const tl = timeline(stage, server, { span: 3000 });
  const shown = screen(stage.root, 'What the app shows', 'Nothing asked for yet');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(AbortAddon());
  const DEADLINE = 1000;
  let run = 0;

  const send = async (takes: number): Promise<void> => {
    const mine = ++run;
    server.latency = takes;
    tl.reset();
    shown.show('Loading…');
    stage.say(`The server will take ${takes} ms; the deadline is ${DEADLINE} ms`);
    stage.after(DEADLINE, () => mine === run && tl.mark('deadline', 'info'));
    await api
      .get('/report')
      .setTimeout(DEADLINE)
      .onAbort(() => {
        if (stage.disposed) return;
        shown.show('Sorry, that took too long. Try again.', 'warn');
        stage.say('The deadline passed first, so the request was cut and .onAbort() ran', 'warn');
        tl.mark('gave up', 'warn');
      })
      .json(() => {
        if (stage.disposed) return;
        shown.show('Report loaded', 'ok');
        stage.say('The answer beat the deadline, so .json() ran', 'ok');
      })
      .catch(() => {});
  };

  if (stage.bar) {
    let takes = 2000;
    slider(stage.bar, 'Server takes', 100, 3000, 100, takes, (v) => (takes = v), (v) => `${v} ms`);
    button(stage.bar, 'Send', () => void send(takes));
    void send(takes);
  } else {
    stage.play(async (wait) => {
      for (const takes of [400, 2400]) {
        await send(takes);
        await wait(1500);
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
