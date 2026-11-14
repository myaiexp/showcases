// The timeout also covers reading the body: a slow trickle runs out the clock
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { bodyMeter } from '../../shared/retry-meter.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let limit = 1000;
  const lab = retryLab(el, ctx, {
    hint: 'The answer starts quickly but its body arrives in slow pieces, 0.35 s apart (about 1.75 s in all).',
    span: 3000,
    fullSpan: 4000,
    // The headers come back after 300 ms; the body then trickles out in 6 pieces.
    routes: { '/log': { json: { readings: Array.from({ length: 60 }, (_, i) => i * 7) }, stream: { pieces: 6, every: 350 } } },
  });
  const meter = bodyMeter(lab.row, lab.server, lab.stage.signal, 'Body so far', (n) => `${n} bytes`);

  const readLog = (): Promise<boolean> => {
    meter.reset();
    return lab.attempt({
      say: `Answer received. Reading the body, at most ${limit / 1000} s…`,
      // `.json()` reads the body with the same `timeout`, as a second, separate clock.
      // That clock runs out here even though the first one did not.
      call: () => lab.api.get('https://api.example/log', { timeout: limit }).json(),
      ok: () => ({ say: `All pieces arrived inside ${limit / 1000} s, so .json() could finish.` }),
      bad: () => 'The status was 200 and the headers were quick, yet the body ran out of time: a TimeoutError from .json().',
      mark: 'body too slow',
      badTone: 'warn',
    });
  };

  if (lab.stage.preview) {
    const steps = [1000, 2500];
    let i = 0;
    lab.start(async () => {
      limit = steps[i++ % steps.length]!;
      await readLog();
    }, 1000);
  } else {
    slider(lab.stage.bar!, 'timeout:', 500, 3000, 250, limit, (v) => (limit = v), (v) => `${v / 1000} s`);
    lab.start(async () => void (await readLog()), 1500, 'Read the log');
  }
  return lab.dispose;
};

export default mount;
