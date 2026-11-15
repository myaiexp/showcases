// start(alpha), pause(), unpause(), stop() and the isSimulationRunning flag
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the buttons: the caption shows isSimulationRunning as it changes.' });
  const data = tree(130, 17);
  let last = 'new graph';
  let alpha = 1;

  const graph = stage.own(
    new Graph(stage.div, { pointDefaultSize: 7, linkDefaultColor: '#5a5f6a', simulationDecay: 2500, fitViewDelay: 1200 }, stage.device()),
  );
  load(graph, data);
  keepFramed(stage, graph, 2500);

  const act = (name: string, fn: () => void): void => {
    fn();
    last = name;
  };
  stage.every(250, () => stage.say(`${last} → isSimulationRunning: ${graph.isSimulationRunning}`, graph.isSimulationRunning ? 'ok' : 'warn'));
  stage.slider('alpha for start()', 0.1, 1, 0.05, 1, (v) => (alpha = v));
  stage.button('start(alpha)', () => act(`start(${alpha})`, () => graph.start(alpha)));
  stage.button('pause()', () => act('pause()', () => graph.pause()));
  stage.button('unpause()', () => act('unpause()', () => graph.unpause()));
  stage.button('stop()', () => act('stop()', () => graph.stop()));

  if (stage.preview) {
    stage.cycle([
      { run: () => act('start(1)', () => graph.start(1)), hold: 2400 },
      { run: () => act('pause()', () => graph.pause()), hold: 1400 },
      { run: () => act('unpause()', () => graph.unpause()), hold: 2000 },
      { run: () => act('stop()', () => graph.stop()), hold: 1400 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
