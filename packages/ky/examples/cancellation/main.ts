// Cancel a request in flight with an AbortController signal
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { logView, resultView } from '../../shared/panels.ts';
import { attempt, demo } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let takes = ctx.preview ? 800 : 3000;
  let controller: AbortController | null = null;
  const { stage, server, api } = demo(el, ctx, {
    hint: 'A report takes a while to build. Press Cancel while it is working: your code stops waiting at once, and the answer is thrown away.',
    server: { latency: 150 },
    routes: { '/report': () => ({ delay: takes, json: { pages: 212, title: 'Yearly report' } }) },
  });
  const row = stage.row();
  const log = logView(row, 'What happened', stage.preview ? 4 : 6);
  const out = resultView(row);
  let t0 = 0;
  const stamp = (): string => `${((performance.now() - t0) / 1000).toFixed(1)} s`;
  server.on((e) => {
    if (e.kind === 'arrive') log.add(`${stamp()}  server is working…`);
    if (e.kind === 'reply') log.add(`${stamp()}  server answered`, 'ok');
    if (e.kind === 'abort') log.add(`${stamp()}  answer no longer wanted`, 'warn');
  });

  /** One request; resolves when it ends, either way. */
  const start = async (): Promise<void> => {
    controller = new AbortController();
    const { signal } = controller;
    log.clear();
    server.reset();
    t0 = performance.now();
    log.add('0.0 s  asked for the report');
    stage.say('Asking for the report…');
    // The signal option links this request to the controller: controller.abort() cuts it off.
    const got = await attempt(stage, out, () => api.get('https://office.example/report', { signal, retry: 0 }).json());
    controller = null;
    if (got.ok) stage.say('The report arrived.', 'ok');
    else if ((got.error as Error).name === 'AbortError') stage.say('Cancelled: nothing more to wait for.', 'warn');
    else stage.say('The request failed.', 'bad');
  };

  if (stage.preview) {
    let cancelThisRound = true;
    stage.play(async (wait) => {
      const run = start();
      run.catch(() => undefined);
      if (cancelThisRound) {
        await wait(450);
        controller?.abort();
      }
      await run;
      cancelThisRound = !cancelThisRound;
      await wait(1800);
    });
  } else {
    let running = false;
    button(stage.bar!, 'Ask for report', () => {
      if (running) return;
      running = true;
      stage.task(() => start().finally(() => (running = false)));
    });
    button(stage.bar!, 'Cancel', () => controller?.abort());
    slider(stage.bar!, 'report takes', 1000, 5000, 500, takes, (v) => (takes = v), (v) => `${v / 1000} s`);
    out.clear();
  }
  return stage.dispose;
};

export default mount;
