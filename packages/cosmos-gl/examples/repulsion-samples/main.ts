// simulationRepulsionSamples from 2 to 64 on a graph above 4,096 points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities, scatter } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Above 4,096 points close neighbours are sampled. Fewer samples are cheaper and noisier.' });
  const data = communities(stage.preview ? 18 : 40, stage.preview ? 240 : 500, 6, 2, 0.05);
  data.positions = scatter(data.count, stage.preview ? 260 : 600, 3);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: stage.preview ? 3 : 2,
        linkDefaultColor: '#2c313b',
        simulationRepulsionSamples: 16,
        showFPSMonitor: !stage.preview,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 3500);

  tune(stage, graph, {
    label: 'simulationRepulsionSamples',
    min: 2,
    max: 64,
    step: 1,
    value: 16,
    cardValues: [2, 16, 64],
    hold: 4000,
    apply: (v) => {
      graph.setConfigPartial({ simulationRepulsionSamples: v });
      graph.start(0.8);
    },
    say: (v) => `simulationRepulsionSamples ${v}: ${v} sampled neighbours per cell, ${v} extra render passes per tick`,
  });
  return () => stage.dispose();
};

export default mount;
