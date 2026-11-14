// ky.retry({request}) repeats the call at a backup host, minus secrets
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let copyAll = false;
  const { stage, api, lane, seen, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'The main server says "use the backup". The Authorization header is a secret: should it travel too?',
    routes: {
      '/prices': (req) =>
        req.url.host === 'main.example' ? { json: { error: { code: 'FALLBACK_TO_BACKUP' } } } : { json: { prices: [3, 5, 8] } },
    },
  });
  seen('Server received', { headers: ['authorization'], mark: ['authorization'], body: false, fullUrl: true });
  trail('Trips', (req) => req.url.host);
  const out = fullResult();

  const again = go(async () => {
    stage.say('Asking the main server for prices…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://main.example/prices', {
          headers: { authorization: 'Bearer tk-secret' },
          hooks: lane.hooks({
            afterResponse: [
              async ({ request, response }) => {
                const data = (await response.json()) as { error?: { code: string } };
                if (data.error?.code !== 'FALLBACK_TO_BACKUP') return;
                lane.note('afterResponse', 'try backup.example', 'warn');
                // The retry is exactly this Request. Copying headers copies secrets to the other host.
                const headers = copyAll ? new Headers(request.headers) : new Headers({ accept: 'application/json' });
                return ky.retry({ request: new Request('https://backup.example/prices', { method: request.method, headers }), code: 'BACKUP_ENDPOINT' });
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(
      got.ok ? (copyAll ? 'It worked, but the secret token also went to the backup server.' : 'The backup answered, and the secret stayed home.') : 'Failed.',
      got.ok && copyAll ? 'warn' : got.ok ? 'ok' : 'bad',
    );
  });
  if (!stage.preview) checkbox(stage.bar!, 'copy every header to the backup', false, (v) => ((copyAll = v), again()));
  return stage.dispose;
};

export default mount;
