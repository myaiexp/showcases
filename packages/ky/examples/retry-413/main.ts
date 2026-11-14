// A 413 "too large" is retried only when the server says when to come back
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

type Mode = 'plain' | 'header' | 'rule';
const MODES: readonly (readonly [Mode, string])[] = [
  ['plain', '413 with no timing header'],
  ['header', '413 with Retry-After: 1'],
  ['rule', '413 with no header, but shouldRetry says yes'],
];

const mount: Mount = (el, ctx) => {
  let mode: Mode = 'plain';
  const lab = retryLab(el, ctx, {
    hint: '413 usually means "this will never fit". Ky retries it only if there is a reason to hope.',
    span: 2500,
    routes: {
      '/upload': (req) =>
        req.n > 1 ? { json: { stored: true } } : { status: 413, ...(mode === 'header' ? { headers: { 'retry-after': '1' } } : {}) },
    },
  });

  const upload = (): Promise<boolean> =>
    lab.attempt({
      say: `The server answers "Payload Too Large" (${MODES.find(([m]) => m === mode)![1]})…`,
      // 413 is in the default retry list, but only goes round again when a timing header
      // such as Retry-After is present, or `shouldRetry` returns true.
      call: () =>
        lab.api
          .post('https://files.example/upload', {
            json: { photo: 'beach.jpg' },
            retry: { limit: 1, methods: ['post'], ...(mode === 'rule' ? { shouldRetry: () => true } : {}) },
          })
          .json(),
      ok: () => ({ say: mode === 'header' ? 'The server named a time to come back, so Ky waited for it and tried again.' : 'Your rule said yes, so Ky tried again with its normal pause.' }),
      bad: () => 'No hint that waiting would help, so Ky took 413 as final.',
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    const steps: Mode[] = ['plain', 'header'];
    let i = 0;
    lab.start(async () => {
      mode = steps[i++ % steps.length]!;
      await upload();
    }, 1200);
  } else {
    select(lab.stage.bar!, 'the server sends:', MODES, (v) => (mode = v));
    lab.start(async () => void (await upload()), 1500, 'Upload');
  }
  return lab.dispose;
};

export default mount;
