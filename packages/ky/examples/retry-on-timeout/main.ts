// A stuck request times out; Ky retries it only if you say retryOnTimeout
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let again = false;
  const lab = retryLab(el, ctx, {
    hint: 'The first request gets stuck at the server. Ky gives up on it after 0.7 s. Should it ask again?',
    span: 2000,
    // The first try is stuck for 3 s (cut short by the timeout); the second is quick.
    routes: { '/weather': (req) => (req.n === 1 ? { delay: 3000, json: { temp: -12 } } : { json: { city: 'Oulu', temp: -12 } }) },
  });

  const forecast = (): Promise<boolean> =>
    lab.attempt({
      say: again ? 'Asking again if a try times out…' : 'Not asking again if a try times out…',
      // `timeout` limits one try. A timeout is not retried unless `retryOnTimeout` is on.
      call: () => lab.api.get('https://api.example/weather', { timeout: 700, retry: { limit: 2, retryOnTimeout: again } }).json(),
      ok: () => ({ say: 'The stuck try was dropped after 0.7 s; the second try came straight back.' }),
      bad: () => 'The try timed out and Ky stopped there: a slow server is not treated as a busy one.',
      mark: 'timed out',
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    lab.start(async () => {
      again = !again;
      await forecast();
    }, 1200);
  } else {
    checkbox(lab.stage.bar!, 'retryOnTimeout', false, (v) => (again = v));
    lab.start(async () => void (await forecast()), 1500, 'Run');
  }
  return lab.dispose;
};

export default mount;
