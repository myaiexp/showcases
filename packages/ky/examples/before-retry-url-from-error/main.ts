// beforeRetry reads error.data and adds it to the retry address
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api, lane, trail, fullResult, go } = hookScene(el, ctx, {
    hint: 'The export is busy. The server says "come back with this job number".',
    routes: {
      '/export': (req) =>
        req.url.searchParams.get('processId') === 'job-77' ? { json: { file: 'sales.csv', rows: 1200 } } : { status: 503, json: { processId: 'job-77', message: 'Busy, quote your job number' } },
    },
  });
  trail('Trips and their address');
  const out = fullResult();

  go(async () => {
    stage.say('Asking for the sales export…');
    const got = await attempt(stage, out, () =>
      api
        .get('https://reports.example/export', {
          retry: { limit: 1, delay: () => 250 },
          hooks: lane.hooks({
            beforeRetry: [
              ({ request, error }) => {
                // error.data is the parsed body of the failed answer.
                if (isHTTPError(error) && typeof error.data === 'object' && error.data !== null && 'processId' in error.data) {
                  const url = new URL(request.url);
                  url.searchParams.set('processId', String(error.data.processId));
                  lane.note('beforeRetry', `quoted ${String(error.data.processId)}`, 'ok');
                  return new Request(url, request); // the retry goes to the new address
                }
              },
            ],
          }),
        })
        .json(),
    );
    stage.say(got.ok ? 'The first try got a job number; the retry quoted it and got the file.' : 'The retry failed too.', got.ok ? 'ok' : 'bad');
  });
  return stage.dispose;
};

export default mount;
