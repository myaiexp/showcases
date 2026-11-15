// setLinkArrows, linkDefaultArrows, linkArrowsSizeScale: arrowheads
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Arrows point from the source to the target of each link.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 6, fitViewPadding: 0.1, linkDefaultColor: '#aab3c4', linkDefaultWidth: 4, linkDefaultArrows: false, linkArrowsSizeScale: 3 },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.render();

  const arrowsWhere = (pick: (k: number) => boolean) => {
    graph.setLinkArrows(Array.from({ length: w.linkCount }, (_, k) => pick(k)));
    graph.render();
  };
  const steps = [
    { say: 'linkDefaultArrows: true — every link gets an arrow', run: () => graph.setConfigPartial({ linkDefaultArrows: true }) },
    { say: 'setLinkArrows: arrows on the spokes only', run: () => arrowsWhere((k) => w.isSpoke(k)) },
    { say: 'linkArrowsSizeScale: 6', run: () => graph.setConfigPartial({ linkArrowsSizeScale: 6 }) },
    { say: 'setLinkArrows: arrows on the rings only, scale 3', run: () => { graph.setConfigPartial({ linkArrowsSizeScale: 3 }); arrowsWhere((k) => !w.isSpoke(k)); } },
  ];
  steps.forEach((s, n) => stage.button(['linkDefaultArrows', 'Spokes only', 'Size 6', 'Rings only'][n] ?? 'Step', () => { s.run(); stage.say(s.say); }));
  stage.slider('linkArrowsSizeScale', 0.5, 8, 0.1, 3, (v) => {
    graph.setConfigPartial({ linkArrowsSizeScale: v });
    stage.say(`linkArrowsSizeScale: ${v}`);
  });
  stage.say('No arrows yet: linkDefaultArrows is false');
  stage.cycle(steps.map((s) => ({ say: s.say, run: s.run })), 2200);
  return () => stage.dispose();
};

export default mount;
