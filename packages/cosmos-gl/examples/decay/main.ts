// simulationDecay from 100 to 10000: ticks until the layout cools and stops
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the decay: the same scatter restarts and the caption counts the ticks.' });
  const data = tree(140, 12);
  let decay = 1000;
  let ticks = 0;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: decay,
        fitViewDelay: 1200,
        onSimulationStart: () => (ticks = 0),
        onSimulationTick: (alpha) => {
          ticks++;
          if (ticks % 10 === 0) stage.say(`simulationDecay ${decay}: tick ${ticks}, alpha ${alpha.toFixed(3)}`);
        },
        onSimulationEnd: () => stage.say(`simulationDecay ${decay}: cooled and stopped after ${ticks} ticks`, 'ok'),
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 2500);

  const apply = (v: number): void => {
    decay = v;
    graph.setConfigPartial({ simulationDecay: v });
    graph.setPointPositions(data.positions);
    graph.render(1, 0);
    graph.start(1);
  };
  stage.slider('simulationDecay', 100, 10000, 100, decay, apply);
  stage.button('Restart', () => apply(decay));

  if (stage.preview) stage.cycle([200, 1000, 4000].map((v) => ({ run: () => apply(v) })), 4000);
  return () => stage.dispose();
};

export default mount;
