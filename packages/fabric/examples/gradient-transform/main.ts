// Gradients: gradientTransform rotates, scales or skews the fill without changing coords
import { Canvas, Gradient, Rect, util, type TMat2D } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'gradientTransform is a 2D matrix applied to the gradient only. It turns around the object top left, so the matrix below moves the pivot to the centre first.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const rect = new Rect({ left: 180, top: 120, width: 240, height: 160 });
  canvas.add(rect);

  const set = (angle: number, scale: number): void => {
    // translate(c) * rotate * scale * translate(-c): rotate and scale around the centre of the object
    const c: [number, number] = [rect.width / 2, rect.height / 2];
    const gradientTransform = util.multiplyTransformMatrixArray([
      util.createTranslateMatrix(c[0], c[1]),
      util.createRotateMatrix({ angle }),
      util.createScaleMatrix(scale, scale),
      util.createTranslateMatrix(-c[0], -c[1]),
    ]) as TMat2D;
    rect.set(
      'fill',
      new Gradient({
        type: 'linear',
        gradientUnits: 'pixels',
        coords: { x1: 0, y1: 0, x2: rect.width, y2: 0 },
        colorStops: [
          { offset: 0, color: '#2e9e5b' },
          { offset: 0.5, color: '#fcd34d' },
          { offset: 1, color: '#8e6bd8' },
        ],
        gradientTransform,
      }),
    );
    say(`gradientTransform [${gradientTransform.map((n) => n.toFixed(2)).join(', ')}]`);
    canvas.requestRenderAll();
  };

  set(0, 1);
  if (stage.preview) stage.loop((_dt, t) => set((t * 50) % 360, 0.8 + 0.4 * Math.sin(t * 2)));
  else {
    let angle = 0, scale = 1;
    slider(stage.bar!, 'rotate', 0, 360, 1, angle, (v) => set((angle = v), scale), (v) => `${v}°`);
    slider(stage.bar!, 'scale', 0.3, 2, 0.05, scale, (v) => set(angle, (scale = v)), (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;
