// enableSimulation false: a layout drawn as given, toggled at runtime
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { spiral } from '../../shared/static-layouts.ts';
import { keepFramed } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tree starts on a spiral you gave it. Turn the simulation on to let the links relax it.' });
  const data = tree(110, 2);
  const given = spiral(data.count, 16);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        enableSimulation: false,
        rescalePositions: false, // draw the positions exactly as given
        fitViewDelay: 1000,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(given);
  graph.setPointColors(colors(data.count, (i) => hsl((i / data.count) * 300, 0.7, 0.62)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 2500);

  const set = (on: boolean): void => {
    graph.setConfigPartial({ enableSimulation: on });
    if (on) graph.start(1);
    stage.say(
      on
        ? 'enableSimulation: true: the forces run and the links pull the spiral into a tree'
        : 'enableSimulation: false: nothing moves, the points stay wherever they are',
    );
  };
  const back = (): void => {
    graph.setConfigPartial({ enableSimulation: false });
    graph.setPointPositions(given);
    graph.render(undefined, 0);
    graph.fitView(300, 0.12);
    stage.say('enableSimulation: false: the points are drawn exactly as given, a spiral');
  };
  const box = stage.toggle('enableSimulation', false, set);
  stage.button('Back to the spiral', () => {
    if (box) box.checked = false;
    back();
  });
  stage.say('enableSimulation: false: the points are drawn exactly as given, a spiral');

  if (stage.preview) {
    stage.cycle([
      { run: back, hold: 2000 },
      { run: () => set(true), hold: 4000 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
