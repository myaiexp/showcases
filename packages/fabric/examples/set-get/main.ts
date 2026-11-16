// set() and get() change and read any property, flips and skews included
import { Canvas, Polygon } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'An arrow so the flip is visible. Every control below is one rect.set(key, value) call; the readout reads it back with get().' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const arrow = new Polygon(
    [{ x: 0, y: 20 }, { x: 70, y: 20 }, { x: 70, y: 0 }, { x: 110, y: 40 }, { x: 70, y: 80 }, { x: 70, y: 60 }, { x: 0, y: 60 }],
    { left: 150, top: 100, fill: '#e94b3c', stroke: '#8c2418', strokeWidth: 3 },
  );
  canvas.add(arrow);

  const show = (): void => {
    say(`flipX ${arrow.get('flipX')} flipY ${arrow.get('flipY')}\nskewX ${arrow.get('skewX').toFixed(0)} skewY ${arrow.get('skewY').toFixed(0)}`);
    arrow.setCoords();
    canvas.requestRenderAll();
  };
  show();
  if (stage.bar) {
    checkbox(stage.bar, 'flipX', false, (v) => (arrow.set('flipX', v), show()));
    checkbox(stage.bar, 'flipY', false, (v) => (arrow.set('flipY', v), show()));
    slider(stage.bar, 'skewX', -45, 45, 1, 0, (v) => (arrow.set('skewX', v), show()));
    slider(stage.bar, 'skewY', -45, 45, 1, 0, (v) => (arrow.set('skewY', v), show()));
  } else {
    const steps = [{ flipX: true }, { flipY: true }, { flipX: false, skewX: 30 }, { flipY: false, skewX: 0, skewY: -25 }, { skewY: 0 }];
    let i = 0;
    stage.every(1100, () => (arrow.set(steps[i++ % steps.length]!), show()));
  }

  return stage.dispose;
};

export default mount;
