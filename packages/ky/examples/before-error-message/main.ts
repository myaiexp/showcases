// beforeError rewrites the error's message with what the server explained
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import { hookScene } from '../../shared/hook-kit.ts';
import { attempt } from '../../shared/req-kit.ts';
import { select } from '../../shared/controls.ts';
import type { Reply } from '../../shared/server.ts';

const FAILURES: readonly (readonly [Reply, string])[] = [
  [{ status: 403, json: { message: 'Daily search limit reached.' } }, '403: quota used up'],
  [{ status: 404, json: { message: 'No member called "aino77".' } }, '404: no such member'],
  [{ status: 409, text: 'That username is taken.' }, '409: plain text answer'],
];

const mount: Mount = (el, ctx) => {
  let pick = FAILURES[0]!;
  let runs = 0;
  const { stage, api, lane, result, go } = hookScene(el, ctx, {
    hint: 'The same failed request, read two ways: Ky\'s default message, and the one a hook wrote.',
    routes: { '/member': () => pick[0] },
  });
  const plain = result('Without the hook');
  const hooked = result('With beforeError');

  const again = go(async () => {
    if (stage.preview) pick = FAILURES[runs++ % 2]!;
    stage.say('Looking up a member that fails…');
    const url = 'https://club.example/member';
    await attempt(stage, plain, () => api.get(url, { retry: 0 }).json());
    await attempt(stage, hooked, () =>
      api
        .get(url, {
          retry: 0,
          hooks: lane.hooks({
            beforeError: [
              ({ error }) => {
                // error.data is the server's explanation, already read for you.
                const said = isHTTPError(error) ? (typeof error.data === 'string' ? error.data : (error.data as { message?: string } | undefined)?.message) : undefined;
                if (isHTTPError(error) && said) {
                  error.message = `${said} (${error.response.status})`;
                  lane.note('beforeError', 'used the server\'s words', 'ok');
                }
                return error;
              },
            ],
          }),
        })
        .json(),
    );
    stage.say('Same failure. With the hook your page can show the server\'s own words.', 'ok');
  });
  if (!stage.preview) select(stage.bar!, 'Failure', FAILURES.map((f) => [f, f[1]] as const), (v) => ((pick = v), again()));
  return stage.dispose;
};

export default mount;
