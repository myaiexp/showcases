// Flow: flow 'y-reverse' reverses the order down y
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the height: the order reads 3, 2, 1 down y." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y-reverse', // along the y axis, reversed
    fill: '#676',
    width: 100,
    height: 100,
    children: yTiles(),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
