// An afterResponse hook can read an answer and tell Ky to stop retrying early
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import type { Reply } from '../../shared/server.ts';
import { retryLab } from '../../shared/retry-lab.ts';

const mount: Mount = (el, ctx) => {
  let maintenance = true;
  const lab = retryLab(el, ctx, {
    hint: 'The server fails every time. From the second answer on it says why, in a header.',
    span: 3000,
    fullSpan: 4000,
    routes: {
      '/orders': (req): Reply => {
        const headers: Record<string, string> = req.n >= 2 && maintenance ? { 'x-notice': 'planned maintenance until 06:00' } : {};
        return { status: 503, headers };
      },
    },
  });

  const load = (): Promise<boolean> =>
    lab.attempt({
      say: maintenance ? 'The server will say "maintenance" on its second answer…' : 'The server just keeps failing…',
      call: () =>
        lab.api
          .get('https://shop.example/orders', {
            retry: {
              limit: 4,
              delay: () => 300, // fixed short pauses keep the demo quick
            },
            hooks: {
              afterResponse: [
                ({ options, response, retryCount }) => {
                  // Lowering the limit to the number of retries already made means: no more.
                  if (response.headers.has('x-notice')) options.retry.limit = retryCount;
                },
              ],
            },
          })
          .json(),
      ok: () => ({ say: 'Worked.' }),
      bad: () =>
        maintenance
          ? `The notice said waiting is pointless, so the hook stopped Ky after ${lab.server.requests.length} tries instead of 5.`
          : `With nothing to read in the answers, Ky used all ${lab.server.requests.length} tries.`,
      badTone: 'warn',
    });

  if (lab.stage.preview) {
    lab.start(async () => {
      maintenance = !maintenance;
      await load();
    }, 1100);
  } else {
    checkbox(lab.stage.bar!, 'server explains it is in maintenance', true, (v) => (maintenance = v));
    lab.start(async () => void (await load()), 1500, 'Load orders');
  }
  return lab.dispose;
};

export default mount;
