// shouldRetry: your own rule for when to retry, such as "429 only twice"
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const ANSWERS: readonly (readonly [number, string])[] = [
  [429, '429 Too Many Requests'],
  [404, '404 Not Found'],
  [500, '500 Server Error'],
];

const mount: Mount = (el, ctx) => {
  let status = 429;
  let rule = true;
  const lab = retryLab(el, ctx, {
    hint: 'The server keeps giving the same answer. The retry limit says 5; your rule can stop sooner.',
    span: 2500,
    fullSpan: 4000,
    routes: { '/data': () => ({ status }) },
  });

  const ask = (): Promise<boolean> =>
    lab.attempt({
      say: rule ? `The server always says ${status}. Rule: retry 429 twice, never other 4xx.` : `The server always says ${status}. No custom rule.`,
      call: () =>
        lab.api
          .get('https://api.example/data', {
            retry: {
              limit: 5,
              delay: () => 300, // a short fixed pause keeps this demo quick
              // Only when `rule` is on: your code decides, `undefined` means "use the defaults".
              shouldRetry: rule
                ? ({ error, retryCount }) => {
                    if (isHTTPError(error)) {
                      const code = error.response.status;
                      if (code === 429 && retryCount <= 2) return true;
                      if (code >= 400 && code < 500) return false;
                    }
                    return undefined;
                  }
                : undefined,
            },
          })
          .json(),
      ok: () => ({ say: 'Worked.' }),
      bad: () => `Ky made ${lab.server.requests.length} tries and stopped${rule && status === 429 ? ': your rule allowed only two retries even though the limit was five.' : '.'}`,
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    lab.start(async () => void (await ask()), 1500);
  } else {
    select(lab.stage.bar!, 'server answers:', ANSWERS, (v) => (status = v), status);
    checkbox(lab.stage.bar!, 'use my shouldRetry rule', true, (v) => (rule = v));
    lab.start(async () => void (await ask()), 1500, 'Ask');
  }
  return lab.dispose;
};

export default mount;
