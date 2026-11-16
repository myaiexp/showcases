// Circle startAngle and endAngle (degrees) cut the circle into an arc or pie slice
import { Canvas, Circle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'startAngle and endAngle are degrees; counterClockwise flips the direction the arc is drawn in.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const arc = new Circle({
    left: 150,
    top: 100,
    radius: 70,
    startAngle: 0,
    endAngle: 270,
    fill: '#f2b134',
    stroke: '#a8700a',
    strokeWidth: 4,
  });
  canvas.add(arc);

  const apply = (props: { startAngle?: number; endAngle?: number; counterClockwise?: boolean }): void => {
    arc.set(props);
    say(`${arc.startAngle.toFixed(0)}° to ${arc.endAngle.toFixed(0)}°${arc.counterClockwise ? ' counter-clockwise' : ''}`);
    canvas.requestRenderAll();
  };
  apply({});
  if (stage.bar) {
    slider(stage.bar, 'startAngle', 0, 360, 1, 0, (startAngle) => apply({ startAngle }));
    slider(stage.bar, 'endAngle', 0, 360, 1, 270, (endAngle) => apply({ endAngle }));
    checkbox(stage.bar, 'counterClockwise', false, (counterClockwise) => apply({ counterClockwise }));
  } else {
    stage.loop((_dt, t) => apply({ startAngle: (t * 40) % 360, endAngle: (t * 40 + 90 + 120 * (1 + Math.sin(t * 1.3))) % 360 }));
  }

  return stage.dispose;
};

export default mount;
