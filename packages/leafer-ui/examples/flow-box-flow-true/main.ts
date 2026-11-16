// Box: flow true turns a plain Box into an auto layout container
import { Leafer, Box } from 'leafer-ui';
import '@leafer-in/flow'; // the auto layout plugin: Box and Frame take flow too
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width and height of the Box; its tiles line up like in a Flow." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Box({
    flow: true, // auto layout on a plain Box, along x
    flowWrap: true,
    gap: 5,
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(5),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
