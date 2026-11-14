// Without Retry-After, Ky reads the rate-limit headers other APIs use instead
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

type Kind = 'ratelimit' | 'x-reset' | 'x-retry' | 'twitter' | 'both' | 'none';
const KINDS: readonly (readonly [Kind, string])[] = [
  ['ratelimit', 'RateLimit-Reset: 1'],
  ['x-reset', 'X-RateLimit-Reset: a clock timestamp'],
  ['x-retry', 'X-RateLimit-Retry-After: 1'],
  ['twitter', 'X-Rate-Limit-Reset: a clock timestamp'],
  ['both', 'Retry-After: 1 and RateLimit-Reset: 3'],
  ['none', 'no timing header at all'],
];

const mount: Mount = (el, ctx) => {
  let kind: Kind = 'ratelimit';
  const lab = retryLab(el, ctx, {
    hint: 'Many APIs do not use Retry-After. Pick the header this server uses.',
    span: 3000,
    routes: {
      '/feed': (req) => {
        if (req.n > 1) return { json: { posts: 12 } };
        // A Unix timestamp is whole seconds since 1970; one second from now, rounded up.
        const stamp = String(Math.ceil((Date.now() + 1000) / 1000));
        const headers: Record<string, string> = {
          ratelimit: { 'ratelimit-reset': '1' },
          'x-reset': { 'x-ratelimit-reset': stamp },
          'x-retry': { 'x-ratelimit-retry-after': '1' },
          twitter: { 'x-rate-limit-reset': stamp },
          both: { 'retry-after': '1', 'ratelimit-reset': '3' },
          none: {},
        }[kind];
        facts.clear();
        for (const [k, v] of Object.entries(headers)) facts.add(`${k}: ${v}`, 'warn');
        return { status: 429, headers };
      },
    },
  });
  const facts = lab.facts('Headers the server sent');

  const poll = (): Promise<boolean> =>
    lab.attempt({
      say: `The server says "too many requests" and adds ${KINDS.find(([k]) => k === kind)![1]}…`,
      // Ky tries Retry-After first, then RateLimit-Reset, X-RateLimit-Retry-After,
      // X-RateLimit-Reset and X-Rate-Limit-Reset. Only 413, 429 and 503 answers use them.
      call: () => lab.api.get('https://feed.example/feed').json(),
      ok: () => {
        const waited = Math.round((lab.gaps()[0] ?? 0) / 10) * 10;
        return {
          say:
            kind === 'none'
              ? `No timing header, so Ky used its own pause (${waited} ms).`
              : `Ky found the wait in the headers and paused ${waited} ms before asking again.`,
        };
      },
      bad: () => 'Ky gave up.',
    });

  if (lab.stage.preview) {
    const steps: Kind[] = ['ratelimit', 'x-reset'];
    let i = 0;
    lab.start(async () => {
      kind = steps[i++ % steps.length]!;
      await poll();
    }, 1000);
  } else {
    select(lab.stage.bar!, 'the server sends:', KINDS, (v) => (kind = v));
    lab.start(async () => void (await poll()), 1500, 'Ask');
  }
  return lab.dispose;
};

export default mount;
