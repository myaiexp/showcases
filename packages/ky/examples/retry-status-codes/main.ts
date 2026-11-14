// Only some error answers are worth retrying: busy yes, "not found" no
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const CODES: readonly (readonly [number, string])[] = [
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [404, 'Not Found'],
  [408, 'Request Timeout'],
  [413, 'Payload Too Large'],
  [418, "I'm a teapot"],
  [429, 'Too Many Requests'],
  [500, 'Internal Server Error'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway Timeout'],
];
const label = (code: number): string => `${code} ${CODES.find(([c]) => c === code)?.[1] ?? ''}`;

const mount: Mount = (el, ctx) => {
  let code = 503;
  const lab = retryLab(el, ctx, {
    hint: 'Ky retries 408, 413, 429, 500, 502, 503 and 504 by default. Pick what the server answers with the first time.',
    span: 2000,
    // The first answer is the chosen error; any later one is fine.
    routes: { '/data': (req) => (req.n === 1 ? { status: code } : { json: { fine: true } }) },
  });

  const ask = (): Promise<boolean> =>
    lab.attempt({
      say: `The server answers "${label(code)}"…`,
      // No retry options: these are Ky's default `retry.statusCodes`.
      call: () => lab.api.get('https://api.example/data').json(),
      ok: () => ({ say: `${label(code)} is a temporary kind of trouble, so Ky tried again and it worked.`, badge: 'retried' }),
      bad: () =>
        code === 413
          ? `${label(code)} is only retried when the server says when to come back. Here it did not.`
          : `${label(code)}: asking again would get the same answer, so Ky did not retry.`,
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    const steps = [404, 503, 401, 500];
    let i = 0;
    lab.start(async () => {
      code = steps[i++ % steps.length]!;
      await ask();
    }, 700);
  } else {
    select(lab.stage.bar!, 'first answer:', CODES.map(([c]) => [c, label(c)] as const), (v) => (code = v), code);
    lab.start(async () => void (await ask()), 1500, 'Ask');
  }
  return lab.dispose;
};

export default mount;
