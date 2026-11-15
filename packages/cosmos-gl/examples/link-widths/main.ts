// setLinkWidths sets each link's width; linkWidthScale scales all
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';
import { perItem } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Widths are per link; the scale slider multiplies all of them.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 8, fitViewPadding: 0.1, linkDefaultColor: '#9aa4b5', linkWidthScale: 1, transitionDuration: 700 },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.render();

  let scale = 1;
  const sets: Record<string, (k: number) => number> = {
    'Thicker toward the rim': (k) => 1 + w.ringOf(k) * 1.5,
    'Thinner toward the rim': (k) => 6 - w.ringOf(k) * 1.5,
    'Spokes thick, rings thin': (k) => (w.isSpoke(k) ? 5 : 1),
  };
  const apply = (name: string) => {
    graph.setLinkWidths(perItem(w.linkCount, sets[name] ?? (() => 1)));
    graph.render();
    stage.say(`${name}: setLinkWidths(…) · link 0 is ${graph.getLinkWidths()[0]?.toFixed(1)} px · linkWidthScale ${scale}`);
  };
  const setScale = (s: number) => {
    scale = s;
    graph.setConfigPartial({ linkWidthScale: s });
    stage.say(`linkWidthScale: ${s}`);
  };
  apply('Thicker toward the rim');
  stage.select('setLinkWidths', Object.keys(sets).map((k) => ({ value: k, label: k })), 'Thicker toward the rim', apply);
  stage.slider('linkWidthScale', 0.25, 3, 0.05, 1, setScale);
  stage.cycle(
    [
      { run: () => apply('Thicker toward the rim') },
      { run: () => apply('Spokes thick, rings thin') },
      { run: () => setScale(2) },
      { run: () => setScale(1) },
    ],
    2200,
  );
  return () => stage.dispose();
};

export default mount;
