// The five simulation callbacks (start, tick, end, pause, unpause) in a log
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/log.ts';
import { communities } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Restart, pause and stop the layout and watch which callback fires.' });
  const log = eventLog(stage, 16);
  const data = communities(4, 30, 3);
  let ticks = 0;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 10,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 2500,
        fitViewDelay: 1500,
        onSimulationStart: () => {
          ticks = 0;
          log('onSimulationStart', 'ok');
        },
        onSimulationTick: (alpha) => {
          ticks++;
          if (ticks % 25 === 1) log(`onSimulationTick #${ticks}: alpha ${alpha.toFixed(3)}`);
        },
        onSimulationEnd: () => log(`onSimulationEnd after ${ticks} ticks`, 'warn'),
        onSimulationPause: () => log('onSimulationPause', 'warn'),
        onSimulationUnpause: () => log('onSimulationUnpause', 'ok'),
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 3000);

  stage.button('start()', () => graph.start());
  stage.button('pause()', () => graph.pause());
  stage.button('unpause()', () => graph.unpause());
  stage.button('stop()', () => graph.stop());

  if (stage.preview) {
    stage.cycle([
      { run: () => graph.start(1), hold: 2200 },
      { run: () => graph.pause(), hold: 1200 },
      { run: () => graph.unpause(), hold: 1800 },
      { run: () => graph.stop(), hold: 1500 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
