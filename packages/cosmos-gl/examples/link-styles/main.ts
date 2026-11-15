// setLinkStyles: Solid, Dashed or Dotted per link, plus dash settings
import { Graph, LinkStyle } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { perItem } from '../../shared/data.ts';

const STYLES = [
  { value: String(LinkStyle.Solid), label: 'Solid' },
  { value: String(LinkStyle.Dashed), label: 'Dashed' },
  { value: String(LinkStyle.Dotted), label: 'Dotted' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Spokes are set to Dashed; ring links have no style of their own and follow linkDefaultStyle.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      {
        enableSimulation: false,
        pointDefaultSize: 8,
        fitViewPadding: 0.1,
        linkDefaultColor: '#aab3c4',
        linkDefaultWidth: 2.5,
        linkDefaultStyle: LinkStyle.Solid,
        linkDashLength: 8,
        linkDashGap: 4,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  // NaN is not a valid style, so those links use linkDefaultStyle.
  graph.setLinkStyles(perItem(w.linkCount, (k) => (w.isSpoke(k) ? LinkStyle.Dashed : NaN)));
  graph.render();

  let length = 8;
  let gap = 4;
  let style = 0;
  const apply = () => {
    graph.setConfigPartial({ linkDefaultStyle: style, linkDashLength: length, linkDashGap: gap });
    stage.say(`linkDefaultStyle: ${STYLES[style]?.label} · linkDashLength ${length} · linkDashGap ${gap}`);
  };
  stage.select('linkDefaultStyle', STYLES, '0', (v) => ((style = Number(v)), apply()));
  stage.slider('linkDashLength', 2, 24, 1, 8, (v) => ((length = v), apply()));
  stage.slider('linkDashGap', 2, 16, 1, 4, (v) => ((gap = v), apply()));
  const steps: [number, number, number][] = [[0, 8, 4], [2, 8, 4], [1, 8, 4], [1, 18, 9]];
  stage.cycle(steps.map(([s, l, g]) => ({ run: () => ((style = s), (length = l), (gap = g), apply()) })), 2200);
  return () => stage.dispose();
};

export default mount;
