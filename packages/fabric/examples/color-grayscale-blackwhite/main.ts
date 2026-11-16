// toGrayscale() and toBlackWhite(threshold) turn a palette to grey or 1-bit
import { Canvas, Color } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { swatch } from '../../shared/colors.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Top: the palette. Middle: toGrayscale() (the average of r, g, b). Bottom: toBlackWhite(threshold): grey below the threshold is black.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const palette = ['#e94b3c', '#f4a261', '#fcd34d', '#2e9e5b', '#2a9d8f', '#3b7dd8', '#8e6bd8', '#c9c3b4'];
  const w = 34, gap = 6, x0 = (360 - (palette.length * (w + gap) - gap)) / 2;
  const bw = palette.map((c, i) => {
    const x = x0 + i * (w + gap);
    canvas.add(...swatch(c, x, 25, w, 50));
    const [grey] = swatch('#000', x, 90, w, 50);
    const [bwBox] = swatch('#000', x, 155, w, 50);
    canvas.add(grey!, bwBox!);
    return { source: c, grey: grey!, bw: bwBox! };
  });

  const apply = (threshold: number): void => {
    for (const p of bw) {
      p.grey.set('fill', new Color(p.source).toGrayscale().toRgba());
      p.bw.set('fill', new Color(p.source).toBlackWhite(threshold).toHex() === '000000' ? '#000' : '#fff');
    }
    const c = new Color('#e94b3c');
    say(`#e94b3c -> grey ${c.toGrayscale().toHex()} -> black/white at ${threshold}: ${new Color('#e94b3c').toBlackWhite(threshold).toHex()}`);
    canvas.requestRenderAll();
  };

  apply(127);
  if (stage.preview) stage.loop((_dt, t) => apply(Math.round(130 + 40 * Math.sin(t))));
  else slider(stage.bar!, 'threshold', 1, 255, 1, 127, apply);

  return stage.dispose;
};

export default mount;
