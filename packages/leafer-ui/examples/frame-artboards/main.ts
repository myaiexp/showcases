// Frame: artboards and dropTo
import { Ellipse, Frame, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the circle to the other artboard and press move to board B.', paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));

  const w = stage.preview ? 100 : 190, h = stage.preview ? 120 : 260;
  const gap = (stage.width - w * 2) / 3;
  const a = new Frame({ x: gap, y: (stage.height - h) / 2 - 8, width: w, height: h, fill: '#ffffff' });
  const b = new Frame({ x: gap * 2 + w, y: (stage.height - h) / 2 - 8, width: w, height: h, fill: '#FEF6E4' });
  const dot = new Ellipse({ x: w * 0.3, y: h * 0.3, width: w * 0.5, height: w * 0.5, fill: '#32cd79', draggable: true });
  leafer.add([a, b]);
  a.add(dot);
  const note = caption(stage, leafer);
  const label = (): void => { note.text = `parent: board ${dot.parent === a ? 'A' : 'B'}`; };
  const swap = (): void => {
    dot.dropTo(dot.parent === a ? b : a); // reparent keeping the world position
    label();
  };
  label();
  if (stage.bar) button(stage.bar, 'move to the other board', swap);
  else stage.every(1800, () => { dot.dropTo(dot.parent === a ? b : a); dot.x = w * 0.3; label(); });

  return stage.dispose;
};

export default mount;
