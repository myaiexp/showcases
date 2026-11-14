// beforeRetry drops onUploadProgress after a lost connection, so the retry goes out plain
import { isNetworkError } from 'ky';
import type { Mount } from '@/types.ts';
import { loop } from '../../shared/err-kit.ts';
import { logView } from '../../shared/panels.ts';
import { canStreamUploads, progressBar, size, uploadBody } from '../../shared/prog-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const PIECES = 6;
const PIECE = 50_000;
const TOTAL = PIECES * PIECE;

const mount: Mount = (el, ctx) => {
  const streams = canStreamUploads();
  const { stage, server, api } = demo(el, ctx, {
    hint: 'The first try loses its connection. The retry drops the progress bar and goes out the plain way.',
    server: { latency: 80, delay: 60, readPace: 130 },
    // The first upload is cut off after the server has read it; the second is saved.
    routes: { 'PUT /upload': (req) => (req.n === 1 ? { drop: true } : { json: { saved: true } }) },
  });
  const row = stage.row();
  const bar = progressBar(row, 'Progress bar');
  const log = logView(row, 'What happened', stage.preview ? 4 : 6);
  server.on((e) => {
    if (e.kind === 'send' && e.req.n === 2) log.add('try 2 sent, with no progress bar', 'info');
  });

  loop(
    stage,
    async () => {
      server.reset();
      log.clear();
      if (streams) bar.reset('nothing yet');
      else bar.notice('No stream support here: Ky never calls the bar.');
      log.add(streams ? 'try 1 sent, the bar follows it' : 'try 1 sent (this browser cannot report progress)');
      stage.say('Uploading… the connection will drop once.');
      await api
        .put('https://files.example/upload', {
          body: uploadBody(PIECES, PIECE),
          retry: { limit: 1 },
          onUploadProgress: (p) => bar.set(p.transferredBytes / TOTAL, `${size(p.transferredBytes)} of ${size(TOTAL)} sent`),
          hooks: {
            beforeRetry: [
              ({ error }) => {
                if (!isNetworkError(error)) return;
                log.add('connection lost (NetworkError)', 'bad');
                if (streams) bar.notice('Progress is off for the retry.');
                // Undefined puts Ky's default back: no upload progress for this retry and later ones.
                return { options: { onUploadProgress: undefined } };
              },
            ],
          },
        })
        .json();
      log.add('saved', 'ok');
      stage.say('Saved on the second try, without the bar.', 'ok');
    },
    { label: 'Upload again', pause: 2200 },
  );
  return stage.dispose;
};

export default mount;
