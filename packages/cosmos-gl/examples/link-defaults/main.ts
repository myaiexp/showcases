// A NaN link color or width falls back to the link defaults
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { perItem } from '../../shared/data.ts';

const OPTIONS = [
  { color: '#666666', width: 1, label: "defaults '#666666', 1 px" },
  { color: '#ffb347', width: 3, label: "linkDefaultColor '#ffb347', linkDefaultWidth 3" },
  { color: '#ff5c7a', width: 6, label: "linkDefaultColor '#ff5c7a', linkDefaultWidth 6" },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Spokes carry their own blue color and width; ring links are NaN and follow the defaults.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 8, fitViewPadding: 0.1, linkDefaultColor: '#666666', linkDefaultWidth: 1 },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  // Spokes get explicit values; every ring link is NaN ("use the default"). The arrays are never rewritten.
  graph.setLinkColors(colors(w.linkCount, (k) => (w.isSpoke(k) ? [0.35, 0.75, 1, 1] : [NaN, NaN, NaN, NaN])));
  graph.setLinkWidths(perItem(w.linkCount, (k) => (w.isSpoke(k) ? 2 : NaN)));
  graph.render();

  const set = (n: number) => {
    const o = OPTIONS[n];
    if (!o) return;
    graph.setConfigPartial({ linkDefaultColor: o.color, linkDefaultWidth: o.width });
    stage.say(`${o.label} · getLinkWidths()[1] = ${graph.getLinkWidths()[1]}`);
  };
  stage.select('Defaults', OPTIONS.map((o, i) => ({ value: String(i), label: o.label })), '0', (v) => set(Number(v)));
  stage.say(OPTIONS[0].label);
  stage.cycle(OPTIONS.map((_, n) => ({ run: () => set(n) })), 2200);
  return () => stage.dispose();
};

export default mount;
