// start(alpha) after a scramble: a low alpha cools before the layout recovers
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scramble the points, then start() at the chosen alpha and watch how far the layout gets.' });
  const data = tree(130, 14);
  let alpha = 0.3;
  let ticks = 0;
  let label = '';

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationDecay: 1200,
        fitViewDelay: 1200,
        onSimulationStart: () => (ticks = 0),
        onSimulationTick: () => ticks++,
        onSimulationEnd: () => stage.say(`${label}: cooled after ${ticks} ticks`, 'ok'),
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 2500);

  const run = (a: number): void => {
    alpha = a;
    label = `start(${a})`;
    graph.setPointPositions(data.positions);
    graph.render(0, 0); // render(0) holds the scrambled start still
    graph.start(a);
    stage.say(`${label}: reheating from a scramble`);
  };
  stage.slider('alpha', 0.05, 1, 0.05, alpha, (v) => (alpha = v));
  stage.button('Scramble and start(alpha)', () => run(alpha));
  stage.say('Pick an alpha and press the button');

  if (stage.preview) stage.cycle([0.05, 0.3, 1].map((a) => ({ run: () => run(a) })), 3600);
  return () => stage.dispose();
};

export default mount;
