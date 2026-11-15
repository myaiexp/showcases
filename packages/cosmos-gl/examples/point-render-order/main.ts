// setPointRenderOrder changes which overlapping points sit on top
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter, perItem } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Four colors are interleaved by index, so by default the last ones drawn cover the rest.' });
  const count = 80;
  const sizes = perItem(count, (i) => 14 + ((i * 7) % 5) * 7);

  const graph = stage.own(
    new Graph(stage.div, { enableSimulation: false, pointDefaultSize: 30, fitViewPadding: 0.2 }, stage.device()),
  );
  graph.setPointPositions(scatter(count, 70, 8));
  graph.setPointColors(colors(count, (i) => paletteColor((i % 4) * 2)));
  graph.setPointSizes(sizes);
  graph.render();

  const all = Array.from({ length: count }, (_, i) => i);
  const orders: { say: string; order: number[] | null }[] = [
    { say: 'setPointRenderOrder(null): index order, higher index on top', order: null },
    { say: 'Partial list: every point of the first color goes on top, the rest keep index order below', order: all.filter((i) => i % 4 === 0) },
    { say: 'Full order: biggest points first, so the small ones end on top', order: [...all].sort((a, b) => (sizes[b] ?? 0) - (sizes[a] ?? 0)) },
    { say: 'Full order: index order reversed, so point 0 is on top', order: [...all].reverse() },
  ];
  const apply = (n: number) => {
    const o = orders[n];
    if (!o) return;
    graph.setPointRenderOrder(o.order);
    graph.render();
    stage.say(o.say);
  };
  apply(0);
  ['Index order', 'First color on top', 'Small on top', 'Reversed'].forEach((label, n) => stage.button(label, () => apply(n)));
  stage.cycle(orders.map((_, n) => ({ run: () => apply(n) })), 2200);
  return () => stage.dispose();
};

export default mount;
