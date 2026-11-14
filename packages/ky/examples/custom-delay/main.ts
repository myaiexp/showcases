// retry.delay: choose your own rhythm of pauses between tries
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

interface Curve {
  label: string;
  /** The pause in ms before retry number `attempt`, counting from 1. */
  delay: (attempt: number) => number;
}
const CURVES: Record<string, Curve> = {
  constant: { label: 'always 400 ms', delay: () => 400 },
  linear: { label: '300 ms × attempt', delay: (n) => 300 * n },
  steep: { label: '150 ms × 4 each time', delay: (n) => 150 * 4 ** (n - 1) },
  default: { label: "Ky's default (doubling)", delay: (n) => 300 * 2 ** (n - 1) },
};

const mount: Mount = (el, ctx) => {
  let curve = 'constant';
  const fails = ctx.preview ? 2 : 3;
  const lab = retryLab(el, ctx, {
    hint: 'The server fails a few times. Each curve is a function from "which retry" to "how long to wait".',
    span: 3000,
    fullSpan: 6000,
    routes: { '/stock': (req) => (req.n <= fails ? { status: 503 } : { json: { left: 7 } }) },
  });

  const check = (): Promise<boolean> => {
    const { label, delay } = CURVES[curve]!;
    return lab.attempt({
      say: `Pause rule: ${label}`,
      // `delay` gets the retry number (1, 2, 3…) and returns milliseconds to wait.
      call: () => lab.api.get('https://shop.example/stock', { retry: { limit: fails, delay } }).json(),
      ok: () => ({ say: `${label}: pauses of ${lab.gaps().map((g) => Math.round(g / 10) * 10).join(', ')} ms.` }),
      bad: () => 'Ky gave up.',
    });
  };

  if (lab.stage.preview) {
    const names = ['constant', 'linear', 'steep'];
    let i = 0;
    lab.start(async () => {
      curve = names[i++ % names.length]!;
      await check();
    }, 900);
  } else {
    select(lab.stage.bar!, 'pause rule:', Object.entries(CURVES).map(([k, c]) => [k, c.label] as const), (v) => (curve = v), curve);
    lab.start(async () => void (await check()), 1500, 'Run');
  }
  return lab.dispose;
};

export default mount;
