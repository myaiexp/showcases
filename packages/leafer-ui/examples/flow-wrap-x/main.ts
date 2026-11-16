// Flow: flowWrap true wraps a row onto new lines
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the width: tiles wrap when the row is full." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flowWrap: true, // wrap along the x axis
    gap: { x: 0, y: 10 },
    fill: '#676',
    width: 100,
    height: 100,
    children: xTiles(6),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [30, 140] });
  return stage.dispose;
};

export default mount;
