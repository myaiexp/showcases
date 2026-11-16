// Flow: autoHeight 1 fills the height left over
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the height: the green tile takes whatever is left." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      ...yTiles(2),
      tile(3, 30, 25, { autoHeight: 1 }), // fills the remaining height
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { h: [60, 140] });
  return stage.dispose;
};

export default mount;
