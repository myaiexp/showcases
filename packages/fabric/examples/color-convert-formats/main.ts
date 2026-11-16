// Colors: one colour in every format Color can write
import { Canvas, Color, FabricText, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Pick a colour and an alpha. toHex and toHexa have no "#" and are upper case, toHsl rounds its numbers.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));

  const chip = new Rect({ left: 180, top: 50, width: 320, height: 70, fill: '#e94b3c', stroke: '#00000022', selectable: false });
  const text = new FabricText('', { left: 20, top: 100, originX: 'left', originY: 'top', fontSize: 14, lineHeight: 1.45, fontFamily: 'monospace', fill: '#333', selectable: false });
  canvas.add(chip, text);

  const show = (hex: string, alpha: number): void => {
    const c = new Color(hex).setAlpha(alpha);
    chip.set('fill', c.toRgba());
    text.set(
      'text',
      [
        `toHex()   ${c.toHex()}`,
        `toHexa()  ${c.toHexa()}`,
        `toRgb()   ${c.toRgb()}`,
        `toRgba()  ${c.toRgba()}`,
        `toHsl()   ${c.toHsl()}`,
        `toHsla()  ${c.toHsla()}`,
        `getAlpha() ${c.getAlpha()}`,
      ].join('\n'),
    );
    canvas.requestRenderAll();
  };

  let hex = '#e94b3c';
  let alpha = 1;
  show(hex, alpha);
  if (stage.preview) {
    const hues = ['#e94b3c', '#3b7dd8', '#2e9e5b', '#8e6bd8'];
    let k = 0;
    stage.every(1200, () => {
      k++;
      show(hues[k % hues.length]!, k % 2 ? 0.6 : 1);
    });
  } else {
    color(stage.bar!, 'colour', hex, (v) => show((hex = v), alpha));
    slider(stage.bar!, 'alpha', 0, 1, 0.05, alpha, (v) => show(hex, (alpha = v)), (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;
