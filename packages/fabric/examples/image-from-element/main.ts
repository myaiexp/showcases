// new FabricImage(element, options) turns an img or canvas element into an object
import { Canvas, FabricImage } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 220], hint: 'The source here is a <canvas> painted in code, but an <img> element works the same. Left, top, angle and opacity are ordinary object options.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const source = picture('fruit', 200, 140);
  const image = new FabricImage(source, { left: 160, top: 110, angle: 30, opacity: 0.85 });
  canvas.add(image);

  const apply = (props: { angle?: number; opacity?: number }): void => {
    image.set(props);
    image.setCoords();
    say(`${image.width} × ${image.height} px\nangle ${image.angle.toFixed(0)} · opacity ${image.opacity.toFixed(2)}`);
    canvas.requestRenderAll();
  };
  apply({});
  if (stage.bar) {
    slider(stage.bar, 'angle', -180, 180, 1, 30, (angle) => apply({ angle }));
    slider(stage.bar, 'opacity', 0.1, 1, 0.05, 0.85, (opacity) => apply({ opacity }), (v) => v.toFixed(2));
  } else {
    stage.loop((_dt, t) => apply({ angle: 30 + 35 * Math.sin(t * 1.3), opacity: 0.7 + 0.3 * Math.sin(t * 2) }));
  }

  return stage.dispose;
};

export default mount;
