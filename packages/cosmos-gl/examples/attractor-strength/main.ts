// setPointAttractorStrength: weak points lag, strong ones arrive
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, scatter } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Mode = 'equal' | 'ramp';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch between one strength for all and a ramp along the ring.' });
  const count = 90;

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 8,
        linkDefaultColor: '#3a3f4b',
        simulationAttractor: 0.5,
        simulationGravity: 0.4,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 60, 8));
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.7, 0.62)));
  const links: number[] = [];
  for (let i = 0; i < count; i++) links.push(i, (i + 1) % count);
  graph.setLinks(new Float32Array(links));
  const targets = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    targets[i * 2] = CENTER + Math.cos(a) * 170;
    targets[i * 2 + 1] = CENTER + Math.sin(a) * 170;
  }
  graph.setPointAttractors(targets);
  graph.render();
  keepFramed(stage, graph, 2500);

  const words: Record<Mode, string> = {
    equal: 'every point has strength 1: a round ring',
    ramp: 'strength rises from 0.05 to 1 around the ring: the weak side sags toward the middle',
  };
  const apply = (m: Mode): void => {
    graph.setPointAttractorStrength(Float32Array.from({ length: count }, (_, i) => (m === 'equal' ? 1 : 0.05 + 0.95 * (i / count))));
    graph.render(1, 0);
    stage.say(`setPointAttractorStrength: ${words[m]}`);
  };
  stage.select<Mode>(
    'setPointAttractorStrength',
    [
      { value: 'equal', label: 'equal' },
      { value: 'ramp', label: 'rising along the ring' },
    ],
    'equal',
    apply,
  );
  stage.slider('simulationAttractor', 0.05, 1, 0.05, 0.5, (v) => {
    graph.setConfigPartial({ simulationAttractor: v });
    graph.start(0.8);
  });
  apply('equal');
  if (stage.preview) stage.cycle((['equal', 'ramp'] as const).map((m) => ({ run: () => apply(m) })), 3800);
  return () => stage.dispose();
};

export default mount;
