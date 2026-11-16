// Flow: gap { x: 'auto', y: 20 } on columns
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width: columns spread apart; tiles in a column stay 20 apart." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    flowWrap: true,
    gap: { x: 'auto', y: 20 }, // columns spread, tiles 20 apart
    fill: '#676',
    width: 100,
    height: 100,
    children: yTiles(5),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [70, 140] });
  return stage.dispose;
};

export default mount;
