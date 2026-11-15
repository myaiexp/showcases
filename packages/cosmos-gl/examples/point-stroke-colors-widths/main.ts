// Per-point stroke colors and widths; NaN means the default
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scatter, perItem } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Widths: 0 draws none, NaN uses the default. Colors: a NaN channel uses the default rule.' });
  const count = 60;

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 38, pointDefaultStrokeWidth: 2, pointDefaultStrokeColor: 'auto', pointStrokeContrast: 0.1, fitViewPadding: 0.2, transitionDuration: 600 },
      stage.device(),
    ),
  );
  graph.setPointPositions(scatter(count, 105, 21));
  graph.setPointColors(colors(count, (i) => paletteColor(i * 3 + 1)));
  graph.render();

  const nan4: [number, number, number, number] = [NaN, NaN, NaN, NaN];
  const patterns = [
    {
      say: 'setPointStrokeWidths: 0 / NaN (default 2) / 6 in turn · colors left to the default rule',
      widths: (i: number) => [0, NaN, 6][i % 3] ?? NaN,
      color: () => nan4,
    },
    {
      say: 'setPointStrokeColors: every third point white, others NaN (derived shade)',
      widths: () => 4,
      color: (i: number) => (i % 3 === 0 ? ([1, 1, 1, 1] as [number, number, number, number]) : nan4),
    },
    {
      say: 'Both: red 7 px strokes on every fourth point, the rest on the defaults',
      widths: (i: number) => (i % 4 === 0 ? 7 : NaN),
      color: (i: number) => (i % 4 === 0 ? ([1, 0.2, 0.2, 1] as [number, number, number, number]) : nan4),
    },
  ];
  const apply = (n: number) => {
    const p = patterns[n % patterns.length];
    if (!p) return;
    graph.setPointStrokeWidths(perItem(count, p.widths));
    graph.setPointStrokeColors(colors(count, p.color));
    graph.render();
    stage.say(p.say);
  };
  apply(0);
  patterns.forEach((_, n) => stage.button(`Pattern ${n + 1}`, () => apply(n)));
  stage.cycle(patterns.map((_, n) => ({ run: () => apply(n) })), 2600);
  return () => stage.dispose();
};

export default mount;
