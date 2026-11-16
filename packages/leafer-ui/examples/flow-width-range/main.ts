// Flow: widthRange limits how far autoWidth stretches
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width: the green tile stops growing at 40." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      ...xTiles(2),
      tile(3, 25, 30, { autoWidth: 1, widthRange: { min: 20, max: 40 } }), // autoWidth, kept between 20 and 40
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [60, 160] });
  return stage.dispose;
};

export default mount;
