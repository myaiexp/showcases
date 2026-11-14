// A content-type header you set wins over the one Ky picks for json
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { loop } from '../../shared/err-kit.ts';
import { requestView } from '../../shared/panels.ts';
import { demo } from '../../shared/req-kit.ts';

const WANTED = 'application/x-amz-json-1.1';

const mount: Mount = (el, ctx) => {
  let label = WANTED;
  const { stage, server, api } = demo(el, ctx, {
    hint: 'This service only reads jobs labelled with its own format. The same JSON goes out twice: once with Ky\'s label, once with yours.',
    server: { latency: 90, delay: 60 },
    routes: {
      // A strict service: it refuses any other label, whatever is inside.
      'POST /jobs': (req) =>
        req.headers.get('content-type') === WANTED ? { json: { queued: true } } : { status: 415, json: { error: 'Unknown content type' } },
    },
  });
  const row = stage.row();
  const plain = requestView(row, 'No header', { headers: ['content-type'], mark: ['content-type'] });
  const custom = requestView(row, 'With your header', { headers: ['content-type'], mark: ['content-type'] });
  const views = [plain, custom];
  const titles = ['No header', 'With your header'];
  server.on((e) => {
    if (e.kind === 'arrive') views[e.req.n - 1]?.show(e.req);
    if (e.kind === 'reply') views[e.req.n - 1]!.title.textContent = `${titles[e.req.n - 1]}: ${e.status === 200 ? 'accepted' : `refused ${e.status}`}`;
  });
  if (!stage.preview) textInput(stage.bar!, 'content-type', label, (v) => (label = v), 24);

  const send = async (headers?: Record<string, string>): Promise<boolean> => {
    try {
      // Same JSON both times; only the headers option differs.
      await api.post('https://cloud.example/jobs', { json: { task: 'resize', id: 7 }, ...(headers && { headers }), retry: 0 }).json();
      return true;
    } catch (error) {
      if (stage.disposed || !isHTTPError(error)) throw error;
      return false;
    }
  };
  loop(
    stage,
    async () => {
      server.reset();
      views.forEach((v, i) => {
        v.show(null);
        v.title.textContent = titles[i]!;
      });
      stage.say('Sending the job with only json: …');
      const first = await send();
      stage.say('Now again, with a content-type header…');
      const second = await send({ 'content-type': label });
      stage.say(
        !first && second ? 'Your header beat the one Ky sets.' : `Results: ${first ? 'accepted' : 'refused'}, then ${second ? 'accepted' : 'refused'}.`,
        !first && second ? 'ok' : 'warn',
      );
    },
    { label: 'Send both', pause: 2400 },
  );
  return stage.dispose;
};

export default mount;
