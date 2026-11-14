// TimeoutError remembers which request ran out of time
import { isTimeoutError } from 'ky';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { checklist, kyName, loop } from '../../shared/err-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const WIDGETS = [
  { label: 'weather', path: '/weather' },
  { label: 'news', path: '/news' },
  { label: 'stocks', path: '/stocks' },
];

const mount: Mount = (el, ctx) => {
  let timeout = 800;
  const { stage, api } = demo(el, ctx, {
    hint: 'A dashboard loads three boxes at once. The stocks service is slow (1.5 s). Change how long Ky waits.',
    server: { latency: 80, delay: 60 },
    routes: {
      '/weather': { json: { temp: -4 }, delay: 100 },
      '/news': { json: { headline: 'Snow tonight' }, delay: 250 },
      '/stocks': { json: { index: 1204 }, delay: 1500 },
    },
  });
  const list = checklist(stage.row(), 'Dashboard boxes');
  const rows = WIDGETS.map((w) => list.add(w.label, 'loading…'));
  if (!stage.preview) slider(stage.bar!, 'timeout:', 300, 2500, 100, timeout, (v) => (timeout = v), (v) => `${v / 1000} s`);

  loop(
    stage,
    async () => {
      rows.forEach((r) => r.set('loading…', 'info'));
      let late = false;
      stage.say(`Loading three boxes at once, each allowed ${timeout / 1000} s…`);
      await Promise.all(
        WIDGETS.map(async (w, i) => {
          try {
            await api.get(`https://dash.example${w.path}`, { timeout, retry: 0 }).json();
            rows[i]!.set('loaded', 'ok');
          } catch (error) {
            if (stage.disposed) throw error;
            if (!isTimeoutError(error)) throw error;
            // The error carries the request that timed out, so one handler can serve every box.
            late = true;
            rows[i]!.set(`${kyName(error)}: ${new URL(error.request.url).pathname}`, 'bad');
            stage.say(`The ${w.label} box timed out; the others still loaded.`, 'warn');
          }
        }),
      );
      if (!late) stage.say('Every box loaded in time: try a shorter timeout.', 'ok');
    },
    { label: 'Load again', pause: 2000 },
  );
  return stage.dispose;
};

export default mount;
