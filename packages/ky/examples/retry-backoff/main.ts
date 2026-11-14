// Ky's default retry pause doubles each time: 300, 600, 1200, 2400 ms
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { plural, retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let fails = 3;
  const lab = retryLab(el, ctx, {
    hint: 'The server fails a few times in a row. Each pause Ky waits is double the last one.',
    span: 4000,
    fullSpan: 7000,
    routes: { '/weather': (req) => (req.n <= fails ? { status: 503 } : { json: { city: 'Oulu', temp: -12 } }) },
  });


  const forecast = (): Promise<boolean> =>
    lab.attempt({
      say: `The server will fail ${plural(fails, 'time', 'times')}…`,
      // The limit matches the failures, so the last try works. The pauses are Ky's own:
      // 0.3 s × 2^(n-1), so 300, 600, 1200, 2400 ms.
      call: () => lab.api.get('https://api.example/weather', { retry: fails }).json(),
      ok: () => ({
        say: `Pauses of ${lab.gaps().map((g) => `${Math.round(g / 10) * 10}`).join(', ')} ms: each is twice the one before, so a struggling server gets room to recover.`,
      }),
      bad: () => 'Ky gave up.',
    });

  if (lab.stage.preview) lab.start(async () => void (await forecast()), 1200);
  else {
    slider(lab.stage.bar!, 'server fails:', 1, 4, 1, fails, (v) => (fails = v), (v) => `${v}×`);
    lab.start(async () => void (await forecast()), 1500, 'Run');
  }
  return lab.dispose;
};

export default mount;
