// onUploadProgress: a bar for what you send, and the server's own count beside it
import type { Mount } from '@/types.ts';
import { loop } from '../../shared/err-kit.ts';
import { canStreamUploads, progressBar, size, uploadBody } from '../../shared/prog-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const PIECES = 8;
const PIECE = 60_000;
const TOTAL = PIECES * PIECE;

const mount: Mount = (el, ctx) => {
  const streams = canStreamUploads();
  const { stage, server, api } = demo(el, ctx, {
    hint: streams
      ? 'A 480 KB file is sent in eight pieces. Ky cannot measure a stream, so totalBytes stays 0 until the end: the bar uses the size your page knows.'
      : 'This browser cannot send streamed uploads, so Ky has nothing to measure and skips onUploadProgress. The server still counts what it receives.',
    // readPace: the server reads the upload piece by piece, so it takes visible time.
    server: { latency: 80, delay: 60, readPace: 150 },
    routes: { 'POST /upload': (req) => ({ json: { saved: true, bytes: req.body.length } }) },
  });
  const row = stage.row();
  const mine = progressBar(row, 'Ky: onUploadProgress');
  const theirs = progressBar(row, 'Server has received');
  server.on((e) => {
    if (e.kind === 'upload') theirs.set(e.read / TOTAL, `${size(e.read)} of ${size(TOTAL)}`);
  });

  loop(
    stage,
    async () => {
      server.reset();
      theirs.reset('nothing yet');
      if (streams) mine.reset('nothing yet');
      else mine.notice('No stream support here: Ky skips onUploadProgress.');
      stage.say(streams ? 'Uploading a 480 KB file…' : 'Uploading without a Ky bar: this browser cannot stream.', streams ? 'info' : 'warn');
      await api
        .post('https://files.example/upload', {
          body: uploadBody(PIECES, PIECE),
          retry: 0,
          // Only called where the browser can stream a request. Elsewhere Ky ignores it, silently.
          onUploadProgress: (progress) => {
            mine.set(progress.transferredBytes / TOTAL, `${size(progress.transferredBytes)} of ${size(TOTAL)} sent`);
          },
        })
        .json();
      stage.say(streams ? 'Uploaded: the bar followed the file out.' : 'Uploaded: the server got everything, only the Ky bar is missing.', streams ? 'ok' : 'warn');
    },
    { label: 'Upload again', pause: 2000 },
  );
  return stage.dispose;
};

export default mount;
