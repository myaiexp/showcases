// Flow: gap 'auto' spreads the children over the free space
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width: the gaps grow and shrink, never below 0." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    gap: 'auto', // share the free space, minimum 0
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140] });
  return stage.dispose;
};

export default mount;
