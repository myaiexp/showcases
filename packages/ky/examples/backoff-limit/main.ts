// backoffLimit: stop the doubling pauses from growing past a ceiling
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let ceiling = 500;
  const lab = retryLab(el, ctx, {
    hint: 'The server fails four times. Without a ceiling the pauses would be 300, 600, 1200, 2400 ms.',
    span: 4000,
    fullSpan: 7000,
    routes: { '/prices': (req) => (req.n <= 4 ? { status: 503 } : { json: { coffee: 3.2 } }) },
  });

  const load = (): Promise<boolean> =>
    lab.attempt({
      say: ceiling === Infinity ? 'No ceiling: the pauses keep doubling…' : `No pause may be longer than ${ceiling} ms…`,
      // `backoffLimit` clamps each pause that Ky works out itself (not ones the server asks for).
      call: () => lab.api.get('https://shop.example/prices', { retry: { limit: 4, backoffLimit: ceiling } }).json(),
      ok: () => ({ say: `Pauses of ${lab.gaps().map((g) => Math.round(g / 10) * 10).join(', ')} ms: growth stops at the ceiling.` }),
      bad: () => 'Ky gave up.',
    });

  if (lab.stage.preview) lab.start(async () => void (await load()), 1200);
  else {
    select(lab.stage.bar!, 'longest pause:', [[300, '300 ms'], [500, '500 ms'], [1000, '1000 ms'], [Infinity, 'no limit']] as const, (v) => (ceiling = v), ceiling);
    lab.start(async () => void (await load()), 1500, 'Run');
  }
  return lab.dispose;
};

export default mount;
