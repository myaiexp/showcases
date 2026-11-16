// Pen: a switch from paths, text and an arc
import { Leafer, Pen, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the toggle checkbox to flip the switch.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S, S * 0.8), scale: S / 100 });
  leafer.add(pen);
  const draw = (on: boolean): void => {
    pen.clear();
    const color = on ? '#4DCB71' : '#999999';
    pen.setStyle({ stroke: color, strokeWidth: 4, strokeAlign: 'inside' });
    pen.roundRect(0, 20, 100, 60, 30);
    pen.add(new Text({ x: on ? 22 : 60, y: 42, fill: color, fontSize: 16, text: on ? 'ON' : 'OFF' }));
    pen.setStyle({ fill: color });
    pen.arc(on ? 70 : 30, 50, 23);
  };
  toggle(stage, 'on', true, draw, 1400);

  return stage.dispose;
};

export default mount;
