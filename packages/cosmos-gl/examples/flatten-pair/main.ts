// graph.flatten turns [x, y] pairs into a flat array; graph.pair reverses
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { CENTER } from '../../shared/data.ts';
import { colors, hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The points are written as [x, y] pairs. flatten() makes the array cosmos.gl wants; pair() reads it back.' });
  const count = 60;
  const panel = stage.side();

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, transitionDuration: 0, pointDefaultSize: 7, fitViewOnInit: false },
      stage.device(),
    ),
  );
  // Pairs are easy to write and to map over.
  const pairsAt = (t: number): [number, number][] =>
    Array.from({ length: count }, (_, i) => {
      const a = i * 0.45 + t;
      const r = 12 + i * 2.6;
      return [CENTER + Math.cos(a) * r, CENTER + Math.sin(a) * r];
    });
  graph.setPointColors(colors(count, (i) => hsl((i / count) * 300, 0.8, 0.6)));
  const draw = (t: number): void => {
    const pairs = pairsAt(t);
    const flat = graph.flatten(pairs); // [[x1, y1], [x2, y2], …] → [x1, y1, x2, y2, …]
    graph.setPointPositions(new Float32Array(flat));
    graph.render();
    if (panel) {
      const back = graph.pair(flat); // and back to pairs
      const short = (p: [number, number][]): string => p.slice(0, 3).map(([x, y]) => `[${x.toFixed(0)}, ${y.toFixed(0)}]`).join(', ');
      panel.textContent = `pairs:\n${short(pairs)}, …\n\nflatten(pairs):\n[${flat.slice(0, 6).map((v) => v.toFixed(0)).join(', ')}, …]\n\npair(flat):\n${short(back)}, …`;
    }
  };
  draw(0);
  void graph.ready.then(() => graph.fitViewByPointPositions([CENTER - 170, CENTER - 170, CENTER + 170, CENTER + 170], 0, 0.1));
  stage.say('flatten(pairs) → setPointPositions');

  let t = 0;
  stage.every(stage.preview ? 80 : 50, () => {
    t += 0.04;
    draw(t);
  });
  return () => stage.dispose();
};

export default mount;
