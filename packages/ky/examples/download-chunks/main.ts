// onDownloadProgress's second argument: the actual piece of the file that just arrived
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loop } from '../../shared/err-kit.ts';
import { paintedFile, size, tiles } from '../../shared/prog-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const PIECE = 10_000;

const mount: Mount = (el, ctx) => {
  let pieces = 12;
  const { stage, api } = demo(el, ctx, {
    hint: 'Every slot is one piece of the file. Its colour comes from the first byte of the data that arrived.',
    server: { latency: 80, delay: 60 },
    // Piece i of the file is filled with its own byte value, so the colours prove real data came.
    routes: { '/files/data.bin': () => ({ bytes: paintedFile(pieces, PIECE), stream: { pieces, every: Math.round(2400 / pieces) } }) },
  });
  const mosaic = tiles(stage.root, 'The file, piece by piece');
  if (!stage.preview) slider(stage.bar!, 'pieces:', 4, 30, 1, pieces, (v) => (pieces = v));

  loop(
    stage,
    async () => {
      mosaic.reset(pieces, 'waiting for the first piece…');
      stage.say(`Downloading ${size(pieces * PIECE)} in ${pieces} pieces…`);
      let got = 0;
      await api
        .get('https://files.example/files/data.bin', {
          // `chunk` is a Uint8Array holding the bytes that just arrived.
          onDownloadProgress: (progress, chunk) => {
            mosaic.fill(got++, chunk[0] ?? 0, String(Math.round(chunk.byteLength / 1000)));
            mosaic.say(`piece ${got} of ${pieces} · ${size(progress.transferredBytes)} so far`);
          },
        })
        .arrayBuffer();
      stage.say('All pieces in: the callback saw the data itself, not just a count.', 'ok');
    },
    { label: 'Download again', pause: 1800 },
  );
  return stage.dispose;
};

export default mount;
