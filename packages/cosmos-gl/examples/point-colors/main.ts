// setPointColors gives each point an RGBA; getPointColors reads it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors, hsl, paletteColor, type Rgba } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each scheme is one Float32Array of r, g, b, a per point.' });
  const data = web(10, 4, 34);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 11, linkDefaultColor: '#556', fitViewPadding: 0.2, transitionDuration: 700 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);

  const schemes: Record<string, (i: number) => Rgba> = {
    'By ring': (i) => paletteColor(data.group[i] ?? 0),
    'Rainbow around the web': (i) => hsl(((i % 10) / 10) * 360, 0.8, 0.6),
    'Fading with distance (alpha)': (i) => [1, 0.8, 0.3, 1 - (data.group[i] ?? 0) * 0.22],
  };
  const apply = (name: string) => {
    graph.setPointColors(colors(data.count, schemes[name] ?? paletteColor));
    graph.render();
    const first = Array.from(graph.getPointColors().slice(4, 8), (v) => v.toFixed(2)).join(', ');
    stage.say(`${name}: setPointColors(…) · point 1 reads back [${first}]`);
  };
  apply('By ring');
  stage.select('Colors', Object.keys(schemes).map((k) => ({ value: k, label: k })), 'By ring', apply);
  stage.cycle(Object.keys(schemes).map((k) => ({ run: () => apply(k) })), 2400);
  return () => stage.dispose();
};

export default mount;
