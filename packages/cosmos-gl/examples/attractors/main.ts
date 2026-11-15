// setPointAttractors and simulationAttractor: per-point targets, NaN = none
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, tree } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise simulationAttractor: points with a target move onto the ring. The grey ones have none.' });
  const data = tree(120, 3, 120);
  const free = (i: number): boolean => i % 4 === 3;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#3a3f4b',
        simulationAttractor: 0,
        simulationGravity: 0.1,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => (free(i) ? [0.6, 0.6, 0.62, 1] : hsl((i / data.count) * 300, 0.7, 0.62))));
  graph.setLinks(data.links);
  // One [x, y] pair per point: spots on a ring, NaN where a point has no attractor.
  const targets = new Float32Array(data.count * 2);
  for (let i = 0; i < data.count; i++) {
    const a = (i / data.count) * Math.PI * 2;
    targets[i * 2] = free(i) ? NaN : CENTER + Math.cos(a) * 170;
    targets[i * 2 + 1] = free(i) ? NaN : CENTER + Math.sin(a) * 170;
  }
  graph.setPointAttractors(targets);
  graph.render();
  keepFramed(stage, graph, 2500);

  tune(stage, graph, {
    label: 'simulationAttractor',
    min: 0,
    max: 1,
    step: 0.05,
    value: 0,
    cardValues: [0, 0.3, 1],
    apply: (v) => {
      graph.setConfigPartial({ simulationAttractor: v });
      graph.start(1);
    },
    say: (v) => `simulationAttractor ${v}: ${v === 0 ? 'the attractors do nothing yet' : 'points with a target are pulled to the ring, the grey ones (NaN) are not'}`,
  });
  return () => stage.dispose();
};

export default mount;
