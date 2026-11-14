// retry({ delayRamp }): how the wait between tries grows, three ways side by side
import wretch from 'wretch';
import { retry } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { solo } from '../../shared/mwscene.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { timeline } from '../../shared/timeline.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same server, same first wait; only the way the wait grows differs.' });
  // Waits are shortened in cards so the loop stays quick.
  const base = stage.preview ? 100 : 250;

  // delayRamp gets (delayTimer, attempt number starting at 1) and returns the wait in ms.
  const ramps = [
    { name: 'default: base x attempt', ramp: undefined },
    { name: 'constant: always the base', ramp: (delay: number) => delay },
    { name: 'doubling: base x 2 each time', ramp: (delay: number, attempt: number) => delay * 2 ** (attempt - 1) },
  ];

  const lanes = ramps.map(({ name, ramp }) => {
    const holder = document.createElement('div');
    holder.className = 'ramp';
    const label = document.createElement('div');
    label.className = 'ramp-name';
    label.textContent = name;
    holder.append(label);
    stage.root.append(holder);
    // Each lane gets its own in-memory server: busy for three answers, then fine.
    const server = createServer(stage, { 'GET /posts/1': (req) => (req.attempt <= 3 ? { status: 503 } : { json: { id: 1 } }) }, { latency: stage.preview ? 90 : 150 });
    const tl = timeline(stage, server, { parent: holder, span: stage.preview ? 1500 : 3000 });
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([retry({ delayTimer: base, delayRamp: ramp })]);
    return { api, tl };
  });

  const run = solo(async () => {
    stage.say(`Every lane waits ${base} ms first. Watch how the next waits differ.`);
    await Promise.all(
      lanes.map(({ api, tl }) => {
        tl.reset();
        return api.get('/posts/1').json().catch(() => null);
      }),
    );
    if (!stage.disposed) stage.say('Linear grows gently, constant stays level, doubling stretches fastest', 'ok');
  });

  if (stage.bar) button(stage.bar, 'Run again', () => void run());
  runScript(stage, async (wait) => {
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
