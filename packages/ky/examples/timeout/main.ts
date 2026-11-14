// timeout: how long Ky waits for an answer before giving up
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let limit = 1000;
  const lab = retryLab(el, ctx, {
    hint: 'The weather server needs about 1.7 s to answer. Slide the timeout either side of that.',
    span: 3000,
    fullSpan: 4000,
    // 100 ms out, 1500 ms of thinking, 100 ms back: the answer arrives after 1.7 s.
    routes: { '/weather': { json: { city: 'Oulu', temp: -12 }, delay: 1500 } },
  });

  const forecast = (): Promise<boolean> =>
    lab.attempt({
      say: `Waiting at most ${limit / 1000} s for the answer…`,
      // `timeout` is in milliseconds and counts from the moment the request leaves.
      // A timeout is an error, and not retried unless you ask (retryOnTimeout).
      call: () => lab.api.get('https://api.example/weather', { timeout: limit }).json(),
      ok: () => ({ say: `The answer came in time (after about 1.7 s), inside the ${limit / 1000} s allowed.` }),
      bad: () => `${limit / 1000} s ran out first: Ky cancelled the request and threw a TimeoutError.`,
      mark: 'timed out',
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    const steps = [1000, 2500];
    let i = 0;
    lab.start(async () => {
      limit = steps[i++ % steps.length]!;
      await forecast();
    }, 1000);
  } else {
    slider(lab.stage.bar!, 'timeout:', 500, 3000, 250, limit, (v) => (limit = v), (v) => `${v / 1000} s`);
    lab.start(async () => void (await forecast()), 1500, 'Ask for the weather');
  }
  return lab.dispose;
};

export default mount;
