// .progress() reports how many bytes of the download have arrived so far
import wretch from 'wretch';
import ProgressAddon from 'wretch/addons/progress';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { meter } from '../../shared/meter.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A large file arrives in twelve pieces, a little apart.' });
  // The server sends 48 000 bytes in twelve slow pieces.
  const server = createServer(stage, { '/movie': () => ({ text: 'x'.repeat(48000), drip: { chunks: 12, every: 220 } }) });
  wire(stage, server, { rows: 0 });
  const bar = meter(stage.root, 'Download');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(ProgressAddon());

  const download = async (): Promise<void> => {
    bar.reset();
    stage.say('.get("/movie").progress(...).blob()');
    await api
      .get('/movie')
      .progress((loaded, total) => {
        if (!stage.disposed) bar.set(loaded, total);
      })
      .blob((file) => {
        if (!stage.disposed) stage.say(`Done: ${file.size} bytes, and the bar followed along`, 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [{ label: 'Download again', run: download }], 1500);
  return () => stage.dispose();
};

export default mount;
