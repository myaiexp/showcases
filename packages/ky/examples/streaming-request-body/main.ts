// A ReadableStream body: the file is made piece by piece as it is sent
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { loop } from '../../shared/err-kit.ts';
import { canStreamUploads, progressBar, size } from '../../shared/prog-kit.ts';
import { demo } from '../../shared/req-kit.ts';
import { pieceStream } from '../../shared/tip-kit.ts';

const PIECE = 40_000;

const mount: Mount = (el, ctx) => {
  const streams = canStreamUploads();
  let pieces = 8;
  const { stage, server, api } = demo(el, ctx, {
    hint: streams
      ? 'A recording is handed to Ky as a stream: each piece is made only when the server is ready for it, so the whole file never sits in memory.'
      : 'This browser cannot send a stream as a request body, so the pieces are gathered into one block first and sent whole. Chrome and Edge can stream.',
    // readPace: the server reads the body piece by piece, so the upload takes visible time.
    server: { latency: 80, delay: 60, readPace: 150 },
    routes: { 'POST /recording': (req) => ({ json: { saved: true, bytes: req.body.length } }) },
  });
  const row = stage.row();
  const made = progressBar(row, streams ? 'Your stream' : 'Your file');
  const got = progressBar(row, 'Server has received');
  server.on((e) => {
    if (e.kind === 'upload') got.set(e.read / (pieces * PIECE), `${size(e.read)} of ${size(pieces * PIECE)}`);
  });

  loop(
    stage,
    async () => {
      server.reset();
      got.reset('nothing yet');
      const total = pieces * PIECE;
      let body: BodyInit;
      if (streams) {
        made.reset('no pieces made yet');
        // Each piece is made when Ky's request asks for the next one.
        body = pieceStream(pieces, PIECE, (n) => made.set(n / pieces, `${n} of ${pieces} pieces made`));
      } else {
        made.notice('No stream support here: sending one whole block.');
        body = new Blob([new Uint8Array(total).fill(97)]);
      }
      stage.say(streams ? 'Sending a stream: pieces made on demand…' : 'No streams here: sending the file whole…', streams ? 'info' : 'warn');
      // retry: 0 matters for streams: with retries on, Ky keeps a copy of the whole body in memory.
      await api.post('https://studio.example/recording', { body, retry: 0 }).json();
      stage.say(streams ? 'Sent as a stream: nothing was held back.' : 'Sent whole: the server got every byte.', streams ? 'ok' : 'warn');
    },
    { label: 'Send again', pause: 2200 },
  );
  if (!stage.preview) slider(stage.bar!, 'pieces', 4, 12, 1, pieces, (v) => (pieces = v));
  return stage.dispose;
};

export default mount;
