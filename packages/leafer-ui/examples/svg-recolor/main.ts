// SVG: variable colours by rebuilding the string
import { Image, Leafer, Platform } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a colour: the Image gets a new url.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const svg = (c: string): string =>
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>` +
    `<rect x='4' y='4' width='112' height='112' rx='24' fill='${c}'/>` +
    `<path d='M30 88 C30 48 58 28 92 28 C92 64 72 90 30 88 Z' fill='#ffffff'/></svg>`;
  const S = size(stage);
  const image = new Image({ url: Platform.toURL(svg('#1d2b53'), 'svg'), ...mid(stage, S), width: S, height: S, draggable: true });
  leafer.add(image);
  if (stage.bar) color(stage.bar, 'colour', '#1d2b53', (c) => (image.url = Platform.toURL(svg(c), 'svg')));
  else {
    const cs = ['#1d2b53', '#7e2553', '#008751', '#ab5236'];
    let i = 0;
    stage.every(1200, () => (image.url = Platform.toURL(svg(cs[++i % cs.length]!), 'svg')));
  }

  return stage.dispose;
};

export default mount;
