// A compressed answer has no known size, so progress has bytes but no percentage
import type { Mount } from '@/types.ts';
import { progressBar, size } from '../../shared/prog-kit.ts';
import { cycle, demo, notes } from '../../shared/req-kit.ts';

const BYTES = 300_000;
const ITEMS = [
  { label: 'a plain file', path: 'plain' },
  { label: 'a compressed file (content-encoding: gzip)', path: 'zipped' },
];

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'Same size, two ways of serving it. A compressed answer hides how big the finished file will be.',
    server: { latency: 80, delay: 60 },
    routes: {
      '/files/plain': { bytes: new Uint8Array(BYTES), stream: { pieces: 10, every: 200 } },
      // The content-encoding header is what Ky looks at. The bytes are not really gzip: the
      // browser would only unpack a real network answer, and Ky never opens this one itself.
      '/files/zipped': { bytes: new Uint8Array(BYTES), headers: { 'content-encoding': 'gzip' }, stream: { pieces: 10, every: 200 } },
    },
  });
  const bar = progressBar(stage.root, 'Progress bar');
  const seen = notes(stage.row(), 'What Ky tells you');

  cycle(
    stage,
    ITEMS,
    async (item) => {
      bar.reset('starting…');
      seen.pending();
      stage.say(`Downloading ${item.label}…`);
      await api
        .get(`https://files.example/files/${item.path}`, {
          onDownloadProgress: (p) => {
            seen.set([`transferredBytes: ${p.transferredBytes}`, `totalBytes: ${p.totalBytes}`, `percent: ${Math.round(p.percent * 100)}%`]);
            // totalBytes 0 means "unknown": show activity instead of a made-up percentage.
            if (p.totalBytes === 0) bar.set(null, `${size(p.transferredBytes)} so far · total unknown`);
            else bar.set(p.percent, `${Math.round(p.percent * 100)}% · ${size(p.transferredBytes)} of ${size(p.totalBytes)}`);
          },
        })
        .arrayBuffer();
      stage.say(item.path === 'plain' ? 'The total was known: a real percentage.' : 'No total until the end: all you can show is activity.', item.path === 'plain' ? 'ok' : 'warn');
    },
    { control: 'Serve', pause: 1800 },
  );
  return stage.dispose;
};

export default mount;
