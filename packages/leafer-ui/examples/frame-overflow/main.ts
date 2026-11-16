// Frame: overflow hide is the default
import { Ellipse, Frame, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick overflow and drag the circle.', paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));

  const S = size(stage);
  const frame = new Frame({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 10, width: S, height: S });
  frame.add(new Ellipse({ x: S * 0.6, y: S * 0.6, width: S / 2, height: S / 2, fill: '#32cd79', draggable: true }));
  leafer.add(frame);
  const note = caption(stage, leafer);
  pick(stage, 'overflow', ['hide', 'show'] as const, (v) => {
    frame.overflow = v;
    note.text = `overflow: '${v}'`;
  }, 1600);

  return stage.dispose;
};

export default mount;
