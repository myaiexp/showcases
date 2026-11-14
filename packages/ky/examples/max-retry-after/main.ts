// maxRetryAfter: a server asks for an hour, Ky waits only what you allow
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const ASKS: readonly (readonly [number, string])[] = [
  [10, '10 seconds'],
  [60, '1 minute'],
  [3600, '1 hour'],
];

const mount: Mount = (el, ctx) => {
  let asks = 3600;
  let cap = 1000;
  const lab = retryLab(el, ctx, {
    hint: 'The server asks Ky to wait a very long time. maxRetryAfter says how much of that Ky will accept.',
    span: 3000,
    routes: {
      '/report': (req) =>
        req.n === 1 ? { status: 503, headers: { 'retry-after': String(asks) } } : { json: { report: 'ready' } },
    },
  });
  // A pin on the timeline where the server's long request arrives.
  lab.server.on((e) => {
    if (e.kind === 'reply' && e.req.n === 1) lab.times.mark(ASKS.find(([s]) => s === asks)![1] + '?', 'warn');
  });

  const fetchReport = (): Promise<boolean> =>
    lab.attempt({
      say: `The server asks for ${ASKS.find(([s]) => s === asks)![1]}…`,
      // `maxRetryAfter` caps the wait taken from Retry-After. The card caps at 1 s so the loop stays short.
      call: () => lab.api.get('https://reports.example/report', { retry: { limit: 1, maxRetryAfter: cap } }).json(),
      ok: () => ({ say: `Ky waited ${Math.round((lab.gaps()[0] ?? 0) / 10) * 10} ms, not the whole ask: your code stays responsive.` }),
      bad: () => 'Ky gave up.',
    });

  if (!lab.stage.preview) {
    select(lab.stage.bar!, 'server asks for:', ASKS, (v) => (asks = v), asks);
    select(lab.stage.bar!, 'Ky waits at most:', [[500, '0.5 s'], [1000, '1 s'], [2000, '2 s']] as const, (v) => (cap = v), cap);
  }
  lab.start(async () => void (await fetchReport()), 1400, 'Fetch report');
  return lab.dispose;
};

export default mount;
