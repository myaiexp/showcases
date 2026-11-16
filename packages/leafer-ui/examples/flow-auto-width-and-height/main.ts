// Flow: autoWidth and autoHeight fill both directions
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size: the green tile fills what is left in both directions." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      ...xTiles(2),
      tile(3, 25, 30, { autoWidth: 1, autoHeight: 1 }), // fills width and height
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [60, 140], h: [50, 140] });
  return stage.dispose;
};

export default mount;
