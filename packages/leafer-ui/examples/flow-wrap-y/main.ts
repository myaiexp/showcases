// Flow: flowWrap on a y flow wraps into columns
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the height: tiles wrap into columns." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y', // wrap along the y axis
    flowWrap: true,
    gap: { x: 10, y: 0 },
    fill: '#676',
    width: 100,
    height: 100,
    children: yTiles(6),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { h: [30, 140] });
  return stage.dispose;
};

export default mount;
