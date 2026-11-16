// Flow: heightRange limits how far autoHeight stretches
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the height: the green tile stops growing at 40." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      ...yTiles(2),
      tile(3, 30, 25, { autoHeight: 1, heightRange: { min: 20, max: 40 } }), // autoHeight, kept between 20 and 40
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { h: [60, 160] });
  return stage.dispose;
};

export default mount;
