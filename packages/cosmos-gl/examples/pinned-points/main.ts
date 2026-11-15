// setPinnedPoints: pinned points stay put, the rest of the mesh hangs from them
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mesh } from '../../shared/data.ts';
import { colors } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Pins = 'none' | 'corners' | 'edge';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick which points are pinned. Pinned points are drawn in orange.' });
  const cols = 11;
  const rows = 8;
  const data = mesh(cols, rows, 22);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#6a7080',
        simulationGravity: 0,
        simulationRepulsion: 0.3,
        simulationLinkDistance: 6,
        simulationLinkSpring: 1.2,
        simulationDecay: 3000,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);

  const pins = (p: Pins): number[] => {
    if (p === 'corners') return [0, cols - 1, cols * (rows - 1), cols * rows - 1];
    if (p === 'edge') return Array.from({ length: rows }, (_, y) => y * cols);
    return [];
  };
  const apply = (p: Pins): void => {
    const list = pins(p);
    graph.setPinnedPoints(list.length ? list : null);
    graph.setPointColors(colors(data.count, (i) => (list.includes(i) ? [1, 0.6, 0.25, 1] : [0.45, 0.7, 1, 1])));
    graph.render();
    graph.start(1);
    stage.say(
      p === 'none'
        ? 'setPinnedPoints(null): nothing is pinned, the mesh shrinks into a ball'
        : `setPinnedPoints([${list.slice(0, 4).join(', ')}${list.length > 4 ? ', …' : ''}]): ${p === 'corners' ? 'the corners stay, the mesh is held taut between them' : 'the left edge stays, the rest hangs from it'}`,
    );
  };
  graph.setPointColors(colors(data.count, () => [0.45, 0.7, 1, 1]));
  graph.render();
  keepFramed(stage, graph, 2500);
  stage.select<Pins>(
    'setPinnedPoints',
    [
      { value: 'none', label: 'none (null)' },
      { value: 'corners', label: 'four corners' },
      { value: 'edge', label: 'left edge' },
    ],
    'corners',
    apply,
  );
  if (stage.preview) {
    stage.cycle((['corners', 'edge', 'none'] as const).map((p) => ({ run: () => apply(p) })), 3800);
  } else {
    apply('corners');
  }
  return () => stage.dispose();
};

export default mount;
