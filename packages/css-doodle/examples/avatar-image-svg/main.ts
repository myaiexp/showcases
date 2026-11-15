// image() from css-doodle/generator renders avatars to SVG files
import { image } from 'css-doodle/generator';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['grace', 'ada', 'alan', 'katherine', 'linus', 'margaret'];

const code = `
  @grid: 5 / 48px / #f0f0f0 ^.82;
  --bits: @once.ri(65535);
  background: hsl(@once.r(360) 55% 55%);
  opacity: $(floor(bits / 2 ^ (5 * abs(@dx) + @y)) % 2);
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;justify-content:center';
  stage.root.append(row);

  // No <css-doodle> on the page: image() returns standalone SVG text, which here
  // goes into <img> tags (in a build it would be written to grace.svg and so on).
  const names = ctx.preview ? NAMES.slice(0, 4) : NAMES;
  for (const name of names) {
    const { svg } = await image(code, { seed: name, width: 48, height: 48 });
    if (stage.disposed) return () => {};
    const fig = document.createElement('figure');
    fig.className = 'cd-frame';
    const img = document.createElement('img');
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    img.width = ctx.preview ? 48 : 64;
    img.height = img.width;
    img.alt = `avatar for ${name}`;
    const cap = document.createElement('figcaption');
    cap.textContent = `${name}.svg · ${(svg.length / 1024).toFixed(1)} kB`;
    fig.append(img, cap);
    row.append(fig);
  }

  // The card highlights each file in turn.
  const figs = [...row.children] as HTMLElement[];
  let i = 0;
  const mark = (): void => figs.forEach((f, j) => (f.style.opacity = j === i ? '1' : '.45'));
  if (ctx.preview) {
    mark();
    stage.every(1200, () => {
      i = (i + 1) % figs.length;
      mark();
    });
  }
  stage.say('image(code, { seed, width: 48, height: 48 }) → { svg }');
  return () => stage.dispose();
};

export default mount;
