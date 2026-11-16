// Frame: flow y with flowAlign centre on a Frame
import { Leafer, Frame } from 'leafer-ui';
import '@leafer-in/flow'; // the auto layout plugin: Box and Frame take flow too
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize, yTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the size of the Frame: the column stays centred and is clipped by the edges." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Frame({
    flow: 'y', // auto layout on a Frame, along y
    flowAlign: 'center',
    gap: 4,
    fill: '#676',
    width: 100,
    height: 100,
    children: yTiles(4),
  });
  place(stage, leafer, flow);
  sweepSize(stage, flow, { w: [40, 140], h: [40, 140] });
  return stage.dispose;
};

export default mount;
