// onDownloadProgress: a bar that fills while a big file arrives piece by piece
import type { Mount } from '@/types.ts';
import { outcome } from '../../shared/err-kit.ts';
import { progressBar, size } from '../../shared/prog-kit.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';

const FILES = [
  { label: 'photo.jpg, 120 KB', name: 'photo.jpg', bytes: 120_000 },
  { label: 'video.mp4, 1.2 MB', name: 'video.mp4', bytes: 1_200_000 },
];

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'The server sends the file in ten pieces, 0.2 s apart. Ky reports after each piece.',
    server: { latency: 80, delay: 60 },
    routes: {
      '/files/*': (req) => {
        const file = FILES.find((f) => f.name === req.url.pathname.split('/').pop()) ?? FILES[0]!;
        // The server announces the size (content-length) and streams the body in pieces.
        return { bytes: new Uint8Array(file.bytes), stream: { pieces: 10, every: 200 } };
      },
    },
  });
  const bar = progressBar(stage.root, 'Download');
  const result = outcome(stage.row());

  cycle(
    stage,
    FILES,
    async (file) => {
      bar.reset('starting…');
      stage.say(`Downloading ${file.label}…`);
      const out = await attempt(stage, result, () =>
        api
          .get(`https://files.example/files/${file.name}`, {
            // Called as the body arrives, with how much came in and how much is expected.
            onDownloadProgress: (progress) => {
              bar.set(progress.percent, `${Math.round(progress.percent * 100)}% · ${size(progress.transferredBytes)} of ${size(progress.totalBytes)}`);
            },
          })
          // The body is only read (and so only counted) when you ask for it.
          .arrayBuffer(),
      );
      if (out.ok) stage.say(`Done: the bar followed all ${size(file.bytes)}.`, 'ok');
    },
    { control: 'Download', pause: 1800 },
  );
  return stage.dispose;
};

export default mount;
