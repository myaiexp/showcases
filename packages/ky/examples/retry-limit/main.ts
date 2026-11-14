// retry: 3 gives a busy server three more chances before Ky gives up
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { plural, retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  const lab = retryLab(el, ctx, {
    hint: 'The weather server is busy for its first 3 answers. Choose how many retries Ky may make, then run.',
    span: 4000,
    fullSpan: 6000,
    // Busy (503) for the first three requests, fine from the fourth.
    routes: { '/weather': (req) => (req.n <= 3 ? { status: 503 } : { json: { city: 'Oulu', temp: -12 } }) },
  });
  let limit = 1;

  const forecast = (): Promise<boolean> =>
    lab.attempt({
      say: `Asking for the weather, allowed ${plural(limit, 'retry', 'retries')}…`,
      // A plain number is shorthand for `retry: {limit: 1}`: how many extra tries after the first.
      // The pauses stay at Ky's default (0.3 s, 0.6 s, 1.2 s, 2.4 s).
      call: () => lab.api.get('https://api.example/weather', { retry: limit }).json(),
      ok: () => ({ say: `Worked on try ${lab.server.requests.length}: the server needed ${limit + 1} tries or more.`, badge: `try ${lab.server.requests.length}` }),
      bad: () => `${plural(lab.server.requests.length, 'try', 'tries')} were not enough: Ky gave up and your code got an error.`,
    });

  if (lab.stage.preview) {
    const steps = [0, 1, 3];
    let i = 0;
    lab.start(async () => {
      limit = steps[i++ % steps.length]!;
      await forecast();
    }, 1000);
  } else {
    slider(lab.stage.bar!, 'retries allowed:', 0, 4, 1, limit, (v) => (limit = v));
    lab.start(async () => void (await forecast()), 1500, 'Ask for the weather');
  }
  return lab.dispose;
};

export default mount;
