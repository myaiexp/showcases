// Flow: gap { x: 5, y: 'auto' } spreads the lines over the height
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the height: the space between lines grows with it." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    gap: { x: 5, y: 'auto' }, // y shares the free space
    flowWrap: true,
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(6),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [60, 140] });
  return stage.dispose;
};

export default mount;
