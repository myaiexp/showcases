// .blob() gives a file-like object; an object URL lets an <img> show it
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { sceneSvg, type SceneName } from './image.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server sends a picture. Read it as a Blob and put it on screen.' });
  const server = createServer(stage, {
    'GET /pictures/:name': (req) => ({
      body: new Blob([sceneSvg(req.params['name'] as SceneName)], { type: 'image/svg+xml' }),
      headers: { 'content-type': 'image/svg+xml' },
    }),
  });
  wire(stage, server, { rows: 0 });
  const row = document.createElement('div');
  row.className = 'pic-row';
  const frame = document.createElement('div');
  frame.className = 'pic-frame';
  const img = document.createElement('img');
  img.alt = 'The downloaded picture';
  frame.append(img);
  row.append(frame);
  stage.root.append(row);
  const facts = kv(row, 'The Blob');
  facts.set([], 'Nothing yet');

  // The object URL points at the Blob in memory: give it back when replaced and on cleanup.
  let url = '';
  const forget = (): void => {
    if (url) URL.revokeObjectURL(url);
    url = '';
  };
  stage.onDispose(forget);

  const load = async (name: SceneName): Promise<void> => {
    stage.say(`api.get("/pictures/${name}").blob()`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/pictures/${name}`)
      .blob((blob) => {
        if (stage.disposed) return;
        forget();
        url = URL.createObjectURL(blob);
        img.src = url;
        facts.set([
          ['type', blob.type],
          ['size', `${blob.size} bytes`],
          ['url', url.slice(0, 18) + '…'],
        ]);
        stage.say('A Blob is the picture as a file in memory; an object URL lets <img> show it', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'Sunrise', run: () => load('sunrise') },
    { label: 'Night', run: () => load('night') },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
