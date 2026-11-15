// simulationLinkDistRandomVariationRange: uneven link lengths on a mesh
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';
import { keepFramed, load } from '../../shared/load.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change either end of the range: the links are sent again and the mesh restarts.' });
  const data = mesh(11, 9, 14);
  let range: [number, number] = [1, 1.2];

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 6,
        linkDefaultColor: '#6a7080',
        simulationLinkDistance: 10,
        simulationLinkDistRandomVariationRange: [1, 1.2],
        simulationLinkSpring: 1.5,
        simulationRepulsion: 0.3,
        simulationGravity: 0.1,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  load(graph, data);
  keepFramed(stage, graph, 3000);

  // The multipliers are drawn when the links are uploaded, so send them again.
  const apply = (lo: number, hi: number): void => {
    range = [lo, hi];
    graph.setConfigPartial({ simulationLinkDistRandomVariationRange: [lo, hi] });
    graph.setPointPositions(data.positions);
    graph.setLinks(data.links);
    graph.render(1, 0);
    stage.say(`Range [${lo}, ${hi}]: each link is ${lo} to ${hi} times the link distance`);
  };
  stage.slider('low end', 0.8, 1.2, 0.05, 1, (v) => apply(v, Math.max(v, range[1])));
  stage.slider('high end', 1.2, 2, 0.05, 1.2, (v) => apply(Math.min(range[0], v), v));
  stage.say('Range [1, 1.2]: each link is 1 to 1.2 times the link distance');

  if (stage.preview) {
    const ranges: [number, number][] = [
      [1, 1.2],
      [0.8, 2],
      [1.2, 1.2],
    ];
    stage.cycle(ranges.map(([lo, hi]) => ({ run: () => apply(lo, hi) })), 3200);
  }
  return () => stage.dispose();
};

export default mount;
