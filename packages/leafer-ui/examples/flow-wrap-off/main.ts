// Flow: no flowWrap keeps one line and overflows
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width below the row's width: the tiles overflow the box." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flowWrap: false, // the default: one line
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(6),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [30, 140] });
  return stage.dispose;
};

export default mount;
