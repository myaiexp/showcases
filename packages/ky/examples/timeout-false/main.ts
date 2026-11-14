// timeout: false waits as long as the server takes; give the reader a way out
import type { Mount } from '@/types.ts';
import { button, checkbox, select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let patience: number | false = false;
  let silent = false;
  let stop: AbortController | null = null;
  const lab = retryLab(el, ctx, {
    hint: 'A report server is slow: it answers after 2.5 s. With the clock switched off, Ky just waits.',
    span: 4000,
    fullSpan: 6000,
    routes: { '/report': () => (silent ? { hang: true } : { delay: 2500, json: { rows: 1204 } }) },
  });

  const fetchReport = async (): Promise<boolean> => {
    stop = new AbortController();
    cancel.disabled = false;
    try {
      return await lab.attempt({
        say: patience === false ? 'No time limit: waiting as long as it takes…' : `Waiting at most ${patience / 1000} s…`,
        // `timeout: false` switches the clock off. Ky then waits for ever, so
        // pass a `signal` to be able to stop it yourself.
        call: () => lab.api.get('https://reports.example/report', { timeout: patience, signal: stop!.signal }).json(),
        ok: () => ({ say: 'It took its time (2.7 s), but the report arrived: no clock to cut it short.' }),
        bad: () => (stop!.signal.aborted ? 'You stopped waiting. That is the only way out of a timeout-free request.' : '1 s ran out first: TimeoutError.'),
        mark: stop.signal.aborted ? 'stopped' : 'timed out',
        badTone: 'warn',
      });
    } finally {
      cancel.disabled = true;
    }
  };
  const cancel = lab.stage.bar ? button(lab.stage.bar, 'Stop waiting', () => stop?.abort()) : document.createElement('button');
  cancel.disabled = true;

  if (lab.stage.preview) {
    const steps: (number | false)[] = [1000, false];
    let i = 0;
    lab.start(async () => {
      patience = steps[i++ % steps.length]!;
      await fetchReport();
    }, 1000);
  } else {
    select<number | false>(lab.stage.bar!, 'timeout:', [[false, 'false (no limit)'], [1000, '1 s']], (v) => (patience = v), false);
    checkbox(lab.stage.bar!, 'server never answers', false, (v) => (silent = v));
    lab.start(async () => void (await fetchReport()), 1500, 'Fetch report');
  }
  lab.stage.onDispose(() => stop?.abort());
  return lab.dispose;
};

export default mount;
