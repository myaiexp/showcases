// simulationGravity from 0 to 1 on one tree: loose spread to tight ball
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: gravity is re-applied and the layout restarts.' });
  const data = tree(160, 4);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationGravity: 0.25,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 3000);

  tune(stage, graph, {
    label: 'simulationGravity',
    min: 0,
    max: 1,
    step: 0.05,
    value: 0.25,
    cardValues: [0, 0.25, 1],
    apply: (v) => {
      graph.setConfigPartial({ simulationGravity: v });
      graph.start(1);
    },
    say: (v) => `simulationGravity ${v}: ${v === 0 ? 'only repulsion and links shape the layout' : v < 0.5 ? 'a mild pull toward the middle' : 'a strong pull packs the graph tight'}`,
  });
  return () => stage.dispose();
};

export default mount;
