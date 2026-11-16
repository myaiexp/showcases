// Flow: autoHeight and autoWidth fill both directions
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size: the green tile fills what is left in both directions." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      ...yTiles(2),
      tile(3, 30, 25, { autoHeight: 1, autoWidth: 1 }), // fills height and width
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [50, 140], h: [60, 140] });
  return stage.dispose;
};

export default mount;
