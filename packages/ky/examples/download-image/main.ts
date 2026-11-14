// A picture made in the page is served slowly: progress first, then the image from .blob()
import type { Mount } from '@/types.ts';
import { loop } from '../../shared/err-kit.ts';
import { panel } from '../../shared/panels.ts';
import { makePicture, progressBar, size } from '../../shared/prog-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  let png: Uint8Array | null = null;
  const { stage, api } = demo(el, ctx, {
    hint: 'A picture is drawn on a canvas, turned into PNG bytes and served slowly. The image only appears once all of it is in.',
    server: { latency: 80, delay: 60 },
    routes: { '/photos/sunset.png': () => ({ bytes: png!, headers: { 'content-type': 'image/png' }, stream: { pieces: 10, every: 220 } }) },
  });
  const row = stage.row();
  const bar = progressBar(row, 'Download');
  const shown = panel(row, 'Your code got');
  const frame = document.createElement('div');
  frame.className = 'prog-frame';
  shown.body.append(frame);
  let url: string | null = null;
  const forget = (): void => {
    if (url) URL.revokeObjectURL(url);
    url = null;
    frame.replaceChildren('not here yet');
  };
  forget();
  stage.onDispose(forget);

  loop(
    stage,
    async () => {
      forget();
      bar.reset('drawing the picture…');
      png ??= await makePicture();
      bar.reset('starting…');
      stage.say(`Fetching a ${size(png.byteLength)} picture…`);
      const blob = await api
        .get('https://photos.example/photos/sunset.png', {
          onDownloadProgress: (p) => bar.set(p.percent, `${Math.round(p.percent * 100)}% · ${size(p.transferredBytes)}`),
        })
        // .blob() gives the whole file as a Blob, ready for an <img>.
        .blob();
      if (stage.disposed) return;
      url = URL.createObjectURL(blob);
      const img = new Image();
      img.alt = 'A generated sunset landscape';
      img.src = url;
      frame.replaceChildren(img);
      stage.say(`The picture is here (${size(blob.size)}, ${blob.type}).`, 'ok');
    },
    { label: 'Fetch it again', pause: 2200 },
  );
  return stage.dispose;
};

export default mount;
