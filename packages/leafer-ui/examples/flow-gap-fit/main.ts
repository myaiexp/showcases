// Flow: gap 'fit' spreads the free space and allows overlap
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width below 150: the tiles overlap instead of leaving." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    gap: 'fit', // share the free space, may be negative
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
