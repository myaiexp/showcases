// Fun: a Flow arranging three Boxes
import { Leafer, Box } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';
import { slider, select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a direction and gap.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const flow = new Flow({
    x: u(100),
    y: u(60),
    fill: '#676',
    width: u(100),
    height: u(100),
    children: [
      new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
      new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
      new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] }),
    ],
  });
  leafer.add(flow);

  if (stage.preview) {
    let n = 0;
    stage.every(1300, () => {
      n++;
      flow.flow = n % 2 ? 'y' : 'x'; // the main axis
      flow.gap = n % 4 < 2 ? 0 : 8;
    });
  } else {
    select(stage.bar!, 'flow', ['x', 'y', 'x-reverse', 'y-reverse'], (v) => (flow.flow = v), 'x');
    slider(stage.bar!, 'gap', 0, 30, 1, 0, (v) => (flow.gap = v));
  }

  return stage.dispose;
};

export default mount;
