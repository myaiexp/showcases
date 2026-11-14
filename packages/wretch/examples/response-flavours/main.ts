// One address read four ways: .json(), .text(), .res() and .blob()
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { findPost } from '../../shared/data.ts';
import { grid, pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same post is asked for four times, once per way of reading it.' });
  const server = createServer(stage, { 'GET /posts/:id': (req) => ({ json: findPost(req.params['id']!) }) });
  wire(stage, server, { rows: 0 });
  const panes = grid(stage.root);
  const asJson = pane(panes, '.json()');
  const asText = pane(panes, '.text()');
  const asRes = pane(panes, '.res()');
  const asBlob = pane(panes, '.blob()');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const readAll = async (): Promise<void> => {
    for (const p of [asJson, asText, asRes, asBlob]) p.set('…', 'dim');
    stage.say('Each of the four reads sends api.get("/posts/1") and ends in a different method');
    // A response body can be read once, so each way is its own request.
    const [json, text, res, blob] = await Promise.all([
      api.get('/posts/1').json<{ id: number; title: string }>(),
      api.get('/posts/1').text(),
      api.get('/posts/1').res(),
      api.get('/posts/1').blob(),
    ]);
    if (stage.disposed) return;
    asJson.set(stage.preview ? `{ id: ${json.id}, title: … }` : `{ id: ${json.id},\n  title: "${json.title}" … }`, 'ok');
    asText.set(text, 'info');
    asRes.set(stage.preview ? `Response ${res.status} ${res.statusText}` : `Response\nstatus ${res.status} ${res.statusText}\nok: ${res.ok}\n${res.headers.get('content-type')}`, 'warn');
    asBlob.set(stage.preview ? `Blob ${blob.size} bytes` : `Blob\n${blob.size} bytes\n${blob.type}`, 'bad');
    stage.say('Same answer from the server: an object, a string, the Response itself, a blob of bytes', 'ok');
  };
  const safe = (): void => void readAll().catch(() => {});

  if (stage.bar) button(stage.bar, 'Read again', safe);
  if (stage.preview) {
    stage.play(async (wait) => {
      await readAll();
      await wait(2800);
    });
  } else safe();
  return () => stage.dispose();
};

export default mount;
