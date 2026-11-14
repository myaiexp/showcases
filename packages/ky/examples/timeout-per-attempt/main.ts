// Each retry gets its own fresh timeout clock
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let limit = 600;
  const lab = retryLab(el, ctx, {
    hint: 'The first two tries get stuck. Every new try starts a new timeout clock of the same length.',
    span: 3000,
    fullSpan: 5000,
    // Stuck for 5 s on the first two requests, quick on the third.
    routes: { '/weather': (req) => (req.n <= 2 ? { delay: 5000, json: {} } : { json: { city: 'Oulu', temp: -12 } }) },
  });

  const forecast = (): Promise<boolean> =>
    lab.attempt({
      say: `Each try may take up to ${limit / 1000} s…`,
      // `timeout` applies to one try, so three tries can take three times as long.
      // `retryOnTimeout` lets a timed-out try be followed by another.
      call: () => lab.api.get('https://api.example/weather', { timeout: limit, retry: { limit: 2, retryOnTimeout: true } }).json(),
      ok: () => ({ say: `Two tries cut off after ${limit / 1000} s each, and the third got through. Total time: more than one timeout.` }),
      bad: () => 'Ky gave up.',
    });

  if (!lab.stage.preview) {
    slider(lab.stage.bar!, 'timeout per try:', 300, 1500, 100, limit, (v) => (limit = v), (v) => `${v / 1000} s`);
  }
  lab.start(async () => void (await forecast()), 1300, 'Run');
  return lab.dispose;
};

export default mount;
