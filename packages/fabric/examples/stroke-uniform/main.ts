// strokeUniform keeps the stroke width constant while the object is scaled
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'Left: strokeUniform false, the stroke stretches with scaleX. Right: strokeUniform true, it stays 8 px wide. Drag a side handle to try it by hand.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const base = { top: 100, width: 60, height: 100, fill: '#f2b134', stroke: '#3b2a8c', strokeWidth: 8 };
  const stretched = new Rect({ ...base, left: 85, strokeUniform: false });
  const uniform = new Rect({ ...base, left: 215, strokeUniform: true });
  canvas.add(stretched, uniform);

  const scale = (x: number): void => {
    for (const r of [stretched, uniform]) {
      r.set({ scaleX: x });
      r.setCoords();
    }
    say(`scaleX ${x.toFixed(2)}`);
    canvas.requestRenderAll();
  };
  scale(1);
  if (stage.bar) slider(stage.bar, 'scaleX', 0.5, 2.5, 0.05, 1, scale, (v) => v.toFixed(2));
  else stage.loop((_dt, t) => scale(1.3 + 0.8 * Math.sin(t * 1.6)));

  return stage.dispose;
};

export default mount;
