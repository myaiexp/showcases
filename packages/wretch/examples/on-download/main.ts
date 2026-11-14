// .onDownload() asks for download progress before the request is even made
import wretch from 'wretch';
import ProgressAddon from 'wretch/addons/progress';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { meter } from '../../shared/meter.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The callback is given up front; every call it gets is listed.' });
  const server = createServer(stage, { '/photos': () => ({ text: 'p'.repeat(36000), drip: { chunks: 9, every: 240 } }) });
  const bar = meter(stage.root, 'Download');
  const calls = pane(stage.root, 'Calls to the callback');
  const keep = stage.preview ? 3 : 8;

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(ProgressAddon());

  const download = async (): Promise<void> => {
    bar.reset();
    calls.clear();
    let n = 0;
    stage.say('.onDownload(callback) is set before .get()');
    await api
      // Set on the client, before the request: the callback is kept for the response.
      .onDownload((loaded, total) => {
        if (stage.disposed) return;
        n += 1;
        bar.set(loaded, total);
        calls.add(`#${n}: ${loaded} of ${total} bytes`);
        while (calls.body.children.length > keep) calls.body.firstElementChild?.remove();
        calls.head.textContent = `Calls to the callback: ${n}`;
      })
      .get('/photos')
      .blob(() => {
        if (!stage.disposed) stage.say(`Done after ${n} calls: one at the start, then one per piece`, 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [{ label: 'Download again', run: download }], 1500);
  return () => stage.dispose();
};

export default mount;
