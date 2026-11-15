// setPointClusters and simulationCluster: random links sorted into four groups
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { randomLinks, scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Mode = 'none' | 'all' | 'some';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Assign the clusters, then raise simulationCluster to pull each group together.' });
  const count = 140;
  const groupOf = (i: number): number => i % 4;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        linkDefaultColor: '#3a3f4b',
        simulationCluster: 0.5,
        simulationGravity: 0.2,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 150, 2));
  graph.setPointColors(colors(count, (i) => paletteColor(groupOf(i))));
  graph.setLinks(randomLinks(count, 170, 2));
  graph.render();
  keepFramed(stage, graph, 2500);

  const clusters: Record<Mode, (number | undefined)[]> = {
    none: Array.from({ length: count }, () => undefined),
    all: Array.from({ length: count }, (_, i) => groupOf(i)),
    some: Array.from({ length: count }, (_, i) => (i % 3 === 0 ? undefined : groupOf(i))),
  };
  const words: Record<Mode, string> = {
    none: 'every entry is undefined: no cluster force acts, the random links make one ball',
    all: 'point i is in cluster i % 4: four groups pull together',
    some: 'every third point is undefined: those stay out of the clusters and sit between them',
  };
  const apply = (m: Mode): void => {
    graph.setPointClusters(clusters[m]);
    graph.render(1, 0);
    stage.say(`setPointClusters: ${words[m]}`);
  };
  stage.select<Mode>(
    'setPointClusters',
    [
      { value: 'none', label: 'all undefined' },
      { value: 'all', label: 'all four clusters' },
      { value: 'some', label: 'some undefined' },
    ],
    'none',
    apply,
  );
  stage.slider('simulationCluster', 0, 1, 0.05, 0.5, (v) => {
    graph.setConfigPartial({ simulationCluster: v });
    graph.start(0.8);
  });
  apply('none');
  if (stage.preview) stage.cycle((['none', 'all', 'some'] as const).map((m) => ({ run: () => apply(m) })), 3800);
  return () => stage.dispose();
};

export default mount;
