// Flow: flowAlign { content: 'center', y: 'center' } aligns the tiles in a row
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size: tiles of different heights line up at the middle of their row." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flowAlign: {
      // centre the content, and align the tiles inside the row
      content: 'center',
      y: 'center',
    },
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
