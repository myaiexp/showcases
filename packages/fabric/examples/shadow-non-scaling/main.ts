// Shadows: nonScaling keeps blur and offsets fixed while the object is scaled
import { Canvas, Rect, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Both squares have the same shadow (blur 8, offset 8) and the same scale. By default the shadow is scaled with the object; nonScaling keeps its size on screen.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const scaling = new Rect({ left: 110, top: 115, width: 60, height: 60, fill: '#3b7dd8', shadow: new Shadow({ color: 'rgba(0,0,0,0.5)', blur: 8, offsetX: 8, offsetY: 8 }) });
  const fixed = new Rect({ left: 250, top: 115, width: 60, height: 60, fill: '#2e9e5b', shadow: new Shadow({ color: 'rgba(0,0,0,0.5)', blur: 8, offsetX: 8, offsetY: 8, nonScaling: true }) });
  canvas.add(scaling, fixed);

  const scale = (s: number): void => {
    scaling.set({ scaleX: s, scaleY: s });
    fixed.set({ scaleX: s, scaleY: s });
    say(`scale ${s.toFixed(2)}   left: nonScaling false   right: nonScaling true`);
    canvas.requestRenderAll();
  };

  scale(1);
  if (stage.preview) stage.loop((_dt, t) => scale(1.5 + 0.9 * Math.sin(t * 1.3)));
  else slider(stage.bar!, 'scale', 0.5, 2.5, 0.05, 1, scale, (v) => v.toFixed(2));

  return stage.dispose;
};

export default mount;
