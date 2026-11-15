// setClusterPositions: fixed cluster targets, undefined or NaN = centre
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, randomLinks, scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Mode = 'mass' | 'corners' | 'two';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose where the four clusters are drawn to.' });
  const count = 140;
  const d = 120;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#3a3f4b',
        simulationCluster: 0.6,
        simulationGravity: 0,
        simulationRepulsion: 0.5,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 150, 2));
  graph.setPointColors(colors(count, (i) => paletteColor(i % 4)));
  graph.setLinks(randomLinks(count, 120, 2));
  graph.setPointClusters(Array.from({ length: count }, (_, i) => i % 4));
  graph.render();
  keepFramed(stage, graph, 2500);

  const spots: Record<Mode, (number | undefined)[]> = {
    mass: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    corners: [CENTER - d, CENTER - d, CENTER + d, CENTER - d, CENTER - d, CENTER + d, CENTER + d, CENTER + d],
    two: [CENTER - d, CENTER, CENTER + d, CENTER, NaN, NaN, undefined, undefined],
  };
  const words: Record<Mode, string> = {
    mass: 'all undefined: each cluster gathers at its own centre of mass',
    corners: 'clusters 0 to 3 go to the four corners of a square',
    two: 'clusters 0 and 1 go left and right; 2 (NaN) and 3 (undefined) stay at their centre of mass',
  };
  const apply = (m: Mode): void => {
    graph.setClusterPositions(spots[m]);
    graph.render(1, 0);
    stage.say(`setClusterPositions: ${words[m]}`);
  };
  stage.select<Mode>(
    'setClusterPositions',
    [
      { value: 'mass', label: 'undefined (centre of mass)' },
      { value: 'corners', label: 'four corners' },
      { value: 'two', label: 'two placed, two free' },
    ],
    'mass',
    apply,
  );
  apply('mass');
  if (stage.preview) stage.cycle((['mass', 'corners', 'two'] as const).map((m) => ({ run: () => apply(m) })), 3800);
  return () => stage.dispose();
};

export default mount;
