// setPointAttractors drawing shapes with a chain of links that still pulls
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER, rng, scatter } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';
import { keepFramed } from '../../shared/load.ts';

type Shape = 'heart' | 'star' | 'spiral' | 'circle';

/** Point on a closed curve for t in 0..1, about 170 units across, around CENTER. */
function curve(shape: Shape, t: number): [number, number] {
  const a = t * Math.PI * 2;
  let x = Math.cos(a);
  let y = Math.sin(a);
  if (shape === 'heart') {
    x = (16 * Math.sin(a) ** 3) / 17;
    y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 17;
  } else if (shape === 'star') {
    const r = 0.45 + 0.55 * Math.abs(Math.cos(2.5 * a));
    x = Math.cos(a) * r;
    y = Math.sin(a) * r;
  } else if (shape === 'spiral') {
    const r = 0.1 + 0.9 * t;
    x = Math.cos(a * 3) * r;
    y = Math.sin(a * 3) * r;
  }
  return [CENTER + x * 170, CENTER + y * 170];
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a shape: only the attractor positions change, the links stay as they are.' });
  const count = stage.preview ? 160 : 240;
  const r = rng(4);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: 6,
        linkDefaultColor: '#4a5060',
        simulationAttractor: 0.7,
        simulationGravity: 0.1,
        simulationRepulsion: 0.4,
        fitViewDelay: 1200,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 50, 2));
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.75, 0.62)));
  const links: number[] = [];
  for (let i = 0; i + 1 < count; i++) links.push(i, i + 1);
  for (let k = 0; k < count / 12; k++) links.push(Math.floor(r() * count), Math.floor(r() * count));
  graph.setLinks(new Float32Array(links));
  graph.render();
  keepFramed(stage, graph, 2500);

  const apply = (shape: Shape): void => {
    const targets = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) targets.set(curve(shape, i / count), i * 2);
    graph.setPointAttractors(targets);
    graph.render(1, 0);
    stage.say(`setPointAttractors: point i is pulled to spot i of a ${shape}; the chain of links follows it`);
  };
  stage.select<Shape>(
    'shape',
    [
      { value: 'heart', label: 'heart' },
      { value: 'star', label: 'star' },
      { value: 'spiral', label: 'spiral' },
      { value: 'circle', label: 'circle' },
    ],
    'heart',
    apply,
  );
  stage.slider('simulationAttractor', 0.05, 1, 0.05, 0.7, (v) => {
    graph.setConfigPartial({ simulationAttractor: v });
    graph.start(0.8);
  });
  apply('heart');
  if (stage.preview) stage.cycle((['heart', 'star', 'spiral', 'circle'] as const).map((s) => ({ run: () => apply(s) })), 3600);
  return () => stage.dispose();
};

export default mount;
