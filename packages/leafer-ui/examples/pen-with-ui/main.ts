// Pen: combine drawn paths with UI elements
import { Ellipse, Leafer, Pen } from 'leafer-ui';
import '@leafer-in/corner'; // the corner plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the ring sweep.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#79CB4D' }, { offset: 1, color: '#FEB027' }] } });
  pen.roundRect(0, 0, 100, 100, 30);
  const ring = new Ellipse({ x: 20, y: 20, width: 60, height: 60, innerRadius: 0.5, startAngle: -60, endAngle: 180, cornerRadius: 5, fill: 'white' });
  pen.add(ring);
  drive(stage, 'endAngle', [-50, 180, 1], 180, (v) => (ring.endAngle = v), 4);

  return stage.dispose;
};

export default mount;
