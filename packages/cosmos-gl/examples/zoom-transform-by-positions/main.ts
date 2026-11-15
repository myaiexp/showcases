// setZoomTransformByPointPositions: fit positions, or centre at a scale
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, mesh } from '../../shared/data.ts';
import { load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One position to centre on; scale left on auto fits the positions, otherwise it is fixed.' });
  const data = mesh(30, 20, 10);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 5,
        linkDefaultColor: '#4a505c',
        enableSimulation: false, // a fixed grid
        rescalePositions: false,
        fitViewOnInit: false,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  graph.fitView(0);

  const go = (x: number, y: number, scale: number | undefined, padding: number): void => {
    const target = new Float32Array([CENTER + x - 30, CENTER + y - 30, CENTER + x + 30, CENTER + y + 30]);
    graph.setZoomTransformByPointPositions(target, 800, scale, padding);
    stage.say(`setZoomTransformByPointPositions(box, 800, ${scale ?? 'undefined'}, ${padding})`);
  };

  let x = -90;
  let y = -50;
  let scale = 0; // 0 stands for undefined: fit the positions
  let padding = 0.1;
  stage.slider('centre x', -140, 140, 5, x, (v) => (x = v));
  stage.slider('centre y', -90, 90, 5, y, (v) => (y = v));
  stage.slider('scale (0 = auto)', 0, 12, 0.5, scale, (v) => (scale = v));
  stage.slider('padding', 0, 0.6, 0.02, padding, (v) => (padding = v));
  stage.button('Apply', () => go(x, y, scale || undefined, padding));
  stage.button('Show everything', () => (graph.fitView(800), stage.say('fitView(800)')));

  stage.cycle(
    [
      { run: () => go(-90, -50, undefined, 0.1) },
      { run: () => go(-90, -50, 2, 0.1) },
      { run: () => go(80, 40, 6, 0.1) },
      { run: () => go(80, 40, undefined, 0.4) },
      { say: 'fitView(): everything again', run: () => graph.fitView(800) },
    ],
    2200,
  );
  return () => stage.dispose();
};

export default mount;
