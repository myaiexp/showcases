// simulationFriction from 0 to 1: sluggish settling to bouncy overshoot
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the same scatter is restarted at the new friction.' });
  const data = tree(120, 21);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationFriction: 0.85,
        simulationDecay: 3000,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 2500);

  tune(stage, graph, {
    label: 'simulationFriction',
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.85,
    cardValues: [0.2, 0.85, 0.99],
    hold: 3500,
    apply: (v) => {
      graph.setConfigPartial({ simulationFriction: v });
      graph.setPointPositions(data.positions);
      graph.render(1, 0);
    },
    say: (v) => `simulationFriction ${v}: ${v < 0.5 ? 'high friction, points barely move' : v < 0.95 ? 'points settle smoothly' : 'almost none, points keep coasting and overshoot'}`,
  });
  return () => stage.dispose();
};

export default mount;
