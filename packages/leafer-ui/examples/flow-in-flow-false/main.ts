// Flow: inFlow false takes a child out of the layout
import { Leafer } from 'leafer-ui';
import { Flow } from '@leafer-in/flow'; // the auto layout plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/shapes.ts';
import { place, sweepSize, tile, xTiles } from '../../shared/flow-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick inFlow: the fourth tile joins the row. Untick it: it goes back to its own spot.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const spare = tile(4, 30, 20, {
    inFlow: false, // not part of the auto layout: placed by its coordinates
    x: 50,
    y: 110,
    around: 'top',
  });
  const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [...xTiles(), spare],
  });
  place(stage, leafer, flow, 140, 140);
  toggle(stage, 'inFlow', false, (v) => (spare.inFlow = v), 2200);
  sweepSize(stage, flow, { w: [60, 140] });
  return stage.dispose;
};

export default mount;
