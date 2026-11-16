// Appearance: angular gradient with the default direction
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Switch the stop list." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  const lists = {
    '2 colours': ['#FF4B4B', '#FEB027'],
    '4 colours, closed loop': ['#FF4B4B', '#FEB027', '#79CB4D', '#FF4B4B'],
    '3 colours, closed loop': ['#32cd79', '#FEB027', '#FF4B4B', '#32cd79'],
  };
  pick(stage, 'stops', Object.keys(lists) as (keyof typeof lists)[], (k) => {
    rect.fill = { type: 'angular', stops: lists[k] }; // from the centre towards the bottom
  }, 1800, '4 colours, closed loop');

  return stage.dispose;
};

export default mount;
