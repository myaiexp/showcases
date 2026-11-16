// Flow: autoHeight as a percent of the container
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size: the tile stays at 80% of both sides." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      tile(3, 30, 25, {
        autoHeight: { type: 'percent', value: 0.8 }, // 80% of the container's height
        autoWidth: { type: 'percent', value: 0.8 },
      }),
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [60, 140], h: [60, 140] });
  return stage.dispose;
};

export default mount;
