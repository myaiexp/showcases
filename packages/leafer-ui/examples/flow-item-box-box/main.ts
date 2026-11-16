// Flow: itemBox 'box' ignores the stroke when it lays out
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size: the strokes overlap the next tile." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    itemBox: 'box', // lay out by the child's box
    fill: '#676',
    width: 100,
    height: 100,
    children: [1, 2, 3].map((n) => tile(n, 25, [20, 40, 30][n - 1]!, { stroke: 'black', strokeWidth: 4, strokeAlign: 'center' })),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
