// Shadows: affectStroke decides whether the stroke casts a shadow too
import { Canvas, Rect, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Transparent fill, thick stroke. With affectStroke false (the default) the shadow follows the fill and a stroke-only shape casts none.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const ring = new Rect({ left: 110, top: 120, width: 110, height: 110, fill: 'transparent', stroke: '#e94b3c', strokeWidth: 16 });
  const solid = new Rect({ left: 250, top: 120, width: 110, height: 110, fill: '#fcd34d', stroke: '#2e9e5b', strokeWidth: 16 });
  canvas.add(ring, solid);

  const apply = (affectStroke: boolean, blur: number): void => {
    const make = (): Shadow => new Shadow({ color: 'rgba(0,0,0,0.55)', blur, offsetX: 10, offsetY: 10, affectStroke });
    ring.set('shadow', make());
    solid.set('shadow', make());
    say(`affectStroke: ${affectStroke}`);
    canvas.requestRenderAll();
  };

  let on = false, blur = 8;
  apply(on, blur);
  if (stage.preview) stage.every(1300, () => apply((on = !on), blur));
  else {
    checkbox(stage.bar!, 'affectStroke', on, (v) => apply((on = v), blur));
    slider(stage.bar!, 'blur', 0, 30, 1, blur, (v) => apply(on, (blur = v)));
  }

  return stage.dispose;
};

export default mount;
