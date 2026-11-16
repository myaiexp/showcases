// Shadows: a Shadow with color, blur, offsetX and offsetY
import { Canvas, Circle, Rect, Shadow } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: "An object's shadow property takes a Shadow. The shadow is drawn from the fill and follows the object when it turns.",
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = stage.preview ? (): void => undefined : status(stage, '');

  const rect = new Rect({ left: 120, top: 115, width: 100, height: 100, fill: '#3b7dd8', angle: 12 });
  const disc = new Circle({ left: 250, top: 115, radius: 50, fill: '#fcd34d' });
  canvas.add(rect, disc);

  const o = { color: 'rgba(0,0,0,0.45)', blur: 15, offsetX: 12, offsetY: 12 };
  const apply = (): void => {
    // every object gets its own Shadow instance
    rect.set('shadow', new Shadow({ ...o }));
    disc.set('shadow', new Shadow({ ...o }));
    say(`new Shadow({ color: '${o.color}', blur: ${o.blur}, offsetX: ${o.offsetX}, offsetY: ${o.offsetY} })`);
    canvas.requestRenderAll();
  };

  apply();
  if (stage.preview) {
    stage.loop((_dt, t) => {
      o.offsetX = 20 * Math.cos(t * 1.5);
      o.offsetY = 20 * Math.sin(t * 1.5);
      o.blur = 12 + 10 * Math.sin(t * 2.2);
      apply();
    });
  } else {
    slider(stage.bar!, 'blur', 0, 50, 1, o.blur, (v) => ((o.blur = v), apply()));
    slider(stage.bar!, 'offsetX', -40, 40, 1, o.offsetX, (v) => ((o.offsetX = v), apply()));
    slider(stage.bar!, 'offsetY', -40, 40, 1, o.offsetY, (v) => ((o.offsetY = v), apply()));
    color(stage.bar!, 'color', '#000000', (v) => ((o.color = v), apply()));
  }

  return stage.dispose;
};

export default mount;
