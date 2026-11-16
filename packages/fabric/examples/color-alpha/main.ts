// Colors: getAlpha() and setAlpha() change a colour's opacity, not the object's
import { Canvas, Color, FabricText, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { swatch } from '../../shared/colors.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Same blue, six alphas, drawn over a red bar. The bar shows through the colour only; the object opacity stays 1.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false }));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const bar = new Rect({ left: 180, top: 70, width: 360, height: 34, fill: '#e94b3c', selectable: false });
  canvas.add(bar);
  const boxes = Array.from({ length: 6 }, (_, i) => {
    const [box, label] = swatch('#000', 24 + i * 52, 30, 46, 80, '');
    canvas.add(box!, label!);
    return { box: box!, label: label! as FabricText };
  });
  const caption = new FabricText('', { left: 180, top: 190, fontSize: 12, fontFamily: 'monospace', fill: '#333', selectable: false });
  canvas.add(caption);

  const paint = (step: number): void => {
    const c = new Color('#3b7dd8');
    boxes.forEach(({ box, label }, i) => {
      // setAlpha() changes this Color in place and returns it, so one instance can walk through the values
      c.setAlpha(Number(Math.max(0, 1 - i * step).toFixed(2)));
      box.set('fill', c.toRgba());
      label.set('text', c.getAlpha().toFixed(2));
    });
    caption.set('text', `step ${step.toFixed(2)}: last swatch ${new Color('#3b7dd8').setAlpha(Number(Math.max(0, 1 - 5 * step).toFixed(2))).toRgba()}`);
    say(`opacity of the object: ${boxes[0]!.box.opacity}`);
    canvas.requestRenderAll();
  };

  paint(0.18);
  if (stage.preview) stage.loop((_dt, t) => paint(0.12 + 0.08 * Math.sin(t * 1.4)));
  else slider(stage.bar!, 'alpha step', 0.02, 0.2, 0.01, 0.18, paint, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
