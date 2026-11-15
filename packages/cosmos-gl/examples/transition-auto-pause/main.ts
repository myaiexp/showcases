// A position transition pauses a running simulation; unpause() resumes it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { circlePositions } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the points while the layout runs: it pauses and stays paused until unpause().' });
  const data = tree(70, 5, 120);
  const ringed = circlePositions(data.count, 140);
  let state = 'running';
  const say = (extra: string): void => stage.say(`${extra} (simulation ${state})`);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        transitionDuration: 1000,
        pointDefaultSize: 8,
        linkDefaultColor: '#5a6070',
        simulationDecay: 4000,
        fitViewDelay: 800,
        onSimulationStart: () => {
          state = 'running';
        },
        onSimulationPause: () => {
          state = 'paused';
          say('onSimulationPause fired');
        },
        onSimulationUnpause: () => {
          state = 'running';
          say('onSimulationUnpause fired');
        },
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => hsl((data.group[i] ?? 0) * 40, 0.8, 0.6)));
  graph.setLinks(data.links);
  graph.render(); // the first render snaps and does not pause
  stage.refit(graph, 2200);
  say('First render: the layout runs');

  const moveToRing = async (): Promise<void> => {
    await graph.ready;
    graph.setPointPositions(ringed);
    graph.render(); // a position transition with the simulation running: auto-pause
    say('setPointPositions + render(): the move starts');
  };
  const resume = async (): Promise<void> => {
    await graph.ready;
    graph.unpause();
    say('unpause(): forces pull the points off the ring');
  };
  stage.button('Move to a ring', () => void moveToRing());
  stage.button('unpause()', () => void resume());
  if (stage.preview) {
    stage.cycle([{
          run: async () => {
            await graph.ready;
            graph.start(1);
            say('start(1): the layout runs');
          },
          hold: 1600,
        }, { run: moveToRing, hold: 2600 }, { run: resume, hold: 2800 }], 1000);
  }
  return () => stage.dispose();
};

export default mount;
