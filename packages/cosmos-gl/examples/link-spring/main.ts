// simulationLinkSpring on a mesh: stiff grid at 2, loose cloud near 0
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { tune } from '../../shared/tune.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the mesh is restarted from its grid each time.' });
  const data = mesh(11, 9, 14);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 6,
        linkDefaultColor: '#6a7080',
        simulationLinkSpring: 1,
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
    label: 'simulationLinkSpring',
    min: 0,
    max: 2,
    step: 0.1,
    value: 1,
    cardValues: [0.1, 1, 2],
    apply: (v) => {
      graph.setConfigPartial({ simulationLinkSpring: v });
      graph.setPointPositions(data.positions);
      graph.render(1, 0);
    },
    say: (v) => `simulationLinkSpring ${v}: ${v < 0.4 ? 'weak links, repulsion tears the mesh open' : v < 1.4 ? 'links hold the grid together' : 'stiff links keep the grid tight'}`,
  });
  return () => stage.dispose();
};

export default mount;
