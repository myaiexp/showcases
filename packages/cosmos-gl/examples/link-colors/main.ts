// setLinkColors gives each link its own RGBA; getLinkColors reads it
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, hsl, paletteColor, type Rgba } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each link has four numbers: r, g, b, a.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 8, fitViewPadding: 0.1, linkDefaultWidth: 2.5, linkDefaultColor: '#666666', transitionDuration: 700 },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.render();

  const schemes: Record<string, (k: number) => Rgba> = {
    'By ring': (k) => paletteColor(w.ringOf(k)),
    'Spokes warm, rings cool': (k) => (w.isSpoke(k) ? [1, 0.6, 0.3, 1] : [0.35, 0.75, 1, 1]),
    'Rainbow by link': (k) => hsl((k / w.linkCount) * 360, 0.8, 0.6),
    'Fading (alpha) with distance': (k) => [0.9, 0.9, 0.9, 1 - (w.ringOf(k) - 1) * 0.35],
  };
  const apply = (name: string) => {
    graph.setLinkColors(colors(w.linkCount, schemes[name] ?? (() => [1, 1, 1, 1])));
    graph.render();
    const c = Array.from(graph.getLinkColors().slice(0, 4), (v) => v.toFixed(2)).join(', ');
    stage.say(`${name}: setLinkColors(…) · link 0 reads back [${c}]`);
  };
  apply('By ring');
  stage.select('Colors', Object.keys(schemes).map((k) => ({ value: k, label: k })), 'By ring', apply);
  stage.cycle(Object.keys(schemes).map((k) => ({ run: () => apply(k) })), 2400);
  return () => stage.dispose();
};

export default mount;
