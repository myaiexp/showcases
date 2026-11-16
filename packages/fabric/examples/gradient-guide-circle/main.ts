// Gradients: the three circle gradients from the guide, one after another
import { Canvas, Circle, Gradient } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Coordinates are relative to the circle top left: its highest point is y 0, its lowest circle.height. The circle is 200 px across.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const circle = new Circle({ left: 180, top: 120, radius: 100 });
  canvas.add(circle);

  const looks = {
    'black to white, top to bottom': () =>
      new Gradient({ coords: { x1: 0, y1: 0, x2: 0, y2: circle.height }, colorStops: [{ offset: 0, color: '#000' }, { offset: 1, color: '#fff' }] }),
    'red to blue, left to right': () =>
      new Gradient({ coords: { x1: 0, y1: 0, x2: circle.width, y2: 0 }, colorStops: [{ offset: 0, color: 'red' }, { offset: 1, color: 'blue' }] }),
    'rainbow, six stops': () =>
      new Gradient({
        coords: { x1: 0, y1: 0, x2: circle.width, y2: 0 },
        colorStops: [
          { offset: 0, color: 'red' },
          { offset: 0.2, color: 'orange' },
          { offset: 0.4, color: 'yellow' },
          { offset: 0.6, color: 'green' },
          { offset: 0.8, color: 'blue' },
          { offset: 1, color: 'purple' },
        ],
      }),
  };
  type Look = keyof typeof looks;
  const show = (name: Look): void => {
    circle.set('fill', looks[name]());
    say(name);
    canvas.requestRenderAll();
  };

  const names = Object.keys(looks) as Look[];
  show(names[0]!);
  if (stage.preview) {
    let k = 0;
    stage.every(1300, () => show(names[++k % names.length]!));
  } else select(stage.bar!, 'gradient', names, show);

  return stage.dispose;
};

export default mount;
