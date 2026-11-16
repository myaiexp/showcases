// Line: toPoint becomes width and rotation
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the sliders to move the target point.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const line = new Line({ x: stage.width / 2 - S / 2, y: stage.height / 2, strokeWidth: 5, stroke: '#32cd79', strokeCap: 'round' });
  leafer.add(line);
  const note = caption(stage, leafer);
  const to = { x: S, y: -S / 2 };
  const set = (): void => {
    line.toPoint = { ...to };
    note.text = `width ${Math.round(line.width!)}, rotation ${Math.round(line.rotation!)}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'x', -S, S * 1.6, 1, to.x, (v) => ((to.x = v), set()));
    slider(stage.bar, 'y', -S, S, 1, to.y, (v) => ((to.y = v), set()));
  } else {
    stage.loop((_dt, t) => {
      to.x = Math.cos(t * 1.2) * S * 0.8;
      to.y = Math.sin(t * 1.2) * S * 0.8;
      set();
    });
  }
  set();

  return stage.dispose;
};

export default mount;
