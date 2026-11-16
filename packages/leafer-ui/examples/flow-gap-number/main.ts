// Flow: gap 5 spaces the children by a fixed amount
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size: the space between tiles stays 5." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    gap: 5, // a fixed gap
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
