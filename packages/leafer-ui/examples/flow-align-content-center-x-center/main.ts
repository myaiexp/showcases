// Flow: flowAlign { content: 'center', x: 'center' } aligns the tiles in a column
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the height: tiles in a column line up at their centre side." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    flowWrap: true,
    flowAlign: {
      // centre the content, and align the tiles inside the column
      content: 'center',
      x: 'center',
    },
    gap: { x: 10, y: 0 },
    fill: '#676',
    width: 100,
    height: 100,
    children: yTiles(5),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
