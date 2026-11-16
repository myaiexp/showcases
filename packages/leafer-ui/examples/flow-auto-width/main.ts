// Flow: autoWidth 1 fills the width left over
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width: the green tile takes whatever is left." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      ...xTiles(2),
      tile(3, 25, 30, { autoWidth: 1 }), // fills the remaining width
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [60, 140] });
  return stage.dispose;
};

export default mount;
