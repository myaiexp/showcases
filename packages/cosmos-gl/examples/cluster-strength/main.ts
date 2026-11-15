// setPointClusterStrength: equal pull, or a pull that fades along each cluster
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Mode = 'equal' | 'fade' | 'off';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare equal strength with a strength that fades along each cluster.' });
  const per = 40;
  const count = per * 3;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 7,
        simulationCluster: 0.8,
        simulationGravity: 0,
        simulationRepulsion: 0.8,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 200, 5));
  graph.setPointColors(colors(count, (i) => paletteColor(Math.floor(i / per))));
  graph.setPointClusters(Array.from({ length: count }, (_, i) => Math.floor(i / per)));
  graph.render();
  keepFramed(stage, graph, 2500);

  const strength = (m: Mode): Float32Array =>
    Float32Array.from({ length: count }, (_, i) => (m === 'equal' ? 1 : m === 'off' ? 0.02 : 1 - ((i % per) / per) * 0.97));
  const words: Record<Mode, string> = {
    equal: 'every point has strength 1: tight clumps',
    fade: 'strength falls from 1 to 0.03 along each cluster: early points stay central, later ones drift out',
    off: 'every point has strength 0.02: barely any pull',
  };
  const apply = (m: Mode): void => {
    graph.setPointClusterStrength(strength(m));
    graph.render(1, 0);
    stage.say(`setPointClusterStrength: ${words[m]}`);
  };
  stage.select<Mode>(
    'setPointClusterStrength',
    [
      { value: 'equal', label: 'equal' },
      { value: 'fade', label: 'fading along cluster' },
      { value: 'off', label: 'almost none' },
    ],
    'equal',
    apply,
  );
  apply('equal');
  if (stage.preview) stage.cycle((['equal', 'fade', 'off'] as const).map((m) => ({ run: () => apply(m) })), 3600);
  return () => stage.dispose();
};

export default mount;
