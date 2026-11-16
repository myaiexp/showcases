// Shadows: a glow is a shadow with no offset, a bright colour and a big blur
import { Canvas, Circle, Rect, Shadow, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'offsetX and offsetY are 0 and the shadow takes the shape colour. The blur is what the slider changes; set it from an animation to make the glow pulse.',
    paper: '#14161f',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const shapes = [
    new Rect({ left: 80, top: 120, width: 70, height: 70, fill: '#ff4d6d', rx: 8, ry: 8 }),
    new Circle({ left: 180, top: 120, radius: 40, fill: '#4dd0e1' }),
    new Triangle({ left: 280, top: 120, width: 80, height: 74, fill: '#b6ff4d' }),
  ];
  canvas.add(...shapes);

  const glow = (blur: number): void => {
    for (const s of shapes) s.set('shadow', new Shadow({ color: s.fill as string, blur, offsetX: 0, offsetY: 0 }));
    say(`blur ${blur.toFixed(0)}, offset 0`);
    canvas.requestRenderAll();
  };

  glow(30);
  if (stage.preview) stage.loop((_dt, t) => glow(8 + 32 * (0.5 + 0.5 * Math.sin(t * 2.4))));
  else slider(stage.bar!, 'blur', 0, 80, 1, 30, glow);

  return stage.dispose;
};

export default mount;
