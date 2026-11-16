// Frame: default white fill or transparent
import { Ellipse, Frame, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a fill.', paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));

  const S = size(stage);
  const frame = new Frame({ x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 10, width: S, height: S, stroke: '#888', strokeWidth: 1 });
  frame.add(new Ellipse({ x: S * 0.25, y: S * 0.25, width: S / 2, height: S / 2, fill: '#32cd79', draggable: true }));
  leafer.add(frame);
  const note = caption(stage, leafer);
  const fills: Record<string, Frame['fill']> = {
    'default (white)': undefined,
    "''": '',
    "'#FFF0'": '#FFF0',
    "'#FEB027'": '#FEB027',
    'linear gradient': { type: 'linear', stops: ['#FEB027', '#FF4B4B'] },
  };
  pick(stage, 'fill', Object.keys(fills), (k) => {
    frame.fill = fills[k] ?? '#FFFFFF';
    note.text = `fill: ${k}`;
  }, 1500);

  return stage.dispose;
};

export default mount;
