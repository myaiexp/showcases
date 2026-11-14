// css-doodle example: export() gives SVG markup and, with detail, a PNG blob
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 6 / 100% / #1d3557 _3px;
    background: @p(#e63946, #f1faee, #a8dadc);
    border-radius: @p(50%, 0 50%, 50% 0);
  `);

  // The exported PNG goes into an <img> next to the doodle.
  const fig = document.createElement('figure');
  fig.className = 'cd-frame';
  const img = document.createElement('img');
  img.alt = 'PNG exported from the doodle';
  img.style.width = ctx.preview ? '112px' : '240px';
  const cap = document.createElement('figcaption');
  fig.append(img, cap);
  stage.root.append(fig);
  let url = '';
  stage.onDispose(() => URL.revokeObjectURL(url));

  const snap = async (): Promise<void> => {
    // detail: true also renders the PNG and returns it as blob.
    const { svg, blob, width, height } = await doodle.export({ detail: true });
    if (stage.disposed || !blob) return;
    URL.revokeObjectURL(url);
    url = URL.createObjectURL(blob);
    img.src = url;
    cap.textContent = `PNG ${width}×${height} · ${(blob.size / 1024).toFixed(0)} kB · SVG ${(svg.length / 1024).toFixed(0)} kB`;
  };
  doodle.addEventListener('render', () => void snap());

  if (stage.bar) {
    button(stage.bar, 'New seed', () => doodle.update());
    button(stage.bar, 'Download PNG (scale 2)', () => void doodle.export({ scale: 2, download: true, name: 'my-doodle' }));
  } else {
    stage.every(2600, () => doodle.update());
  }
  stage.say('left: the doodle · right: what export() returned');
  return () => stage.dispose();
};

export default mount;
