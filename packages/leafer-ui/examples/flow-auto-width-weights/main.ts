// Flow: autoWidth weights split the free width
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, tile } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width: tile 3 grows twice as fast as tile 2." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
      tile(1, 25, 20),
      tile(2, 25, 40, { autoWidth: 1 }), // one share
      tile(3, 25, 30, { autoWidth: 2 }), // two shares
    ],
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [60, 160] });
  return stage.dispose;
};

export default mount;
