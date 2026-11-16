// Flow: flow, gap, flowAlign and flowWrap together on three shapes
import { Ellipse, Leafer, Rect, Star } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { place, sweepSize } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the height: the shapes wrap into a second column; the width spreads the columns.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const flow = new Flow({
    flow: 'y',
    gap: { x: 'auto', y: 20 },
    flowAlign: { content: 'top', x: 'from' },
    flowWrap: true,
    width: 260,
    height: 260,
    fill: '#333',
  });
  const rect = new Rect({ fill: 'red' });
  const star = new Star({ fill: 'green', x: 800, height: 100 }); // x is ignored: the flow places it
  const ellipse = new Ellipse({ fill: 'blue' });
  flow.add([rect, star, ellipse]);
  place(stage, leafer, flow, 260, 260, stage.preview ? 0.6 : 1.4);
  sweepSize(stage, flow, { w: [150, 260], h: [150, 260] });
  return stage.dispose;
};

export default mount;
