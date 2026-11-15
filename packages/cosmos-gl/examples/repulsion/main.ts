// simulationRepulsion from 0 to 2: how far points push each other apart
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tree } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the layout restarts with the new repulsion.' });
  const data = tree(160, 9);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#5a5f6a',
        simulationRepulsion: 1,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 3000);

  tune(stage, graph, {
    label: 'simulationRepulsion',
    min: 0,
    max: 2,
    step: 0.1,
    value: 1,
    cardValues: [0.1, 1, 2],
    apply: (v) => {
      graph.setConfigPartial({ simulationRepulsion: v });
      graph.start(1);
    },
    say: (v) => `simulationRepulsion ${v}: ${v < 0.4 ? 'weak, links pull the points into a clump' : v < 1.5 ? 'balanced against the links' : 'strong, the points spread wide'}`,
  });
  return () => stage.dispose();
};

export default mount;
