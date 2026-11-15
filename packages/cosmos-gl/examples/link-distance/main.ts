// simulationLinkDistance on a mesh: the length each link settles at
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the layout restarts and settles at the new link length.' });
  const data = mesh(11, 9, 14);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 6,
        linkDefaultColor: '#6a7080',
        simulationLinkDistance: 10,
        simulationLinkSpring: 1.5,
        simulationRepulsion: 0.3,
        simulationGravity: 0.1,
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
    label: 'simulationLinkDistance',
    min: 1,
    max: 20,
    step: 1,
    value: 10,
    cardValues: [2, 10, 20],
    apply: (v) => {
      graph.setConfigPartial({ simulationLinkDistance: v });
      graph.start(1);
    },
    say: (v) => `simulationLinkDistance ${v}: links settle ${v < 5 ? 'short, the mesh packs close' : v < 15 ? 'at a medium length' : 'long, the mesh spreads out'}`,
  });
  return () => stage.dispose();
};

export default mount;
