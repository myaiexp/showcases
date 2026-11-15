// linkBlending: false draws links opaque with hard edges
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The links here are half transparent and wide, so the overlap near the hub shows the difference.' });
  const w = webLinks(14, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 5, fitViewPadding: 0.1, linkDefaultWidth: 8, linkBlending: true },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.setLinkColors(colors(w.linkCount, (k) => (w.isSpoke(k) ? [1, 0.5, 0.3, 0.5] : [0.3, 0.7, 1, 0.5])));
  graph.render();

  const set = (on: boolean) => {
    graph.setConfigPartial({ linkBlending: on });
    stage.say(on ? 'linkBlending: true — transparency and soft edges, links blend where they cross' : 'linkBlending: false — opaque hard edges, the half-transparent colors are drawn solid');
  };
  stage.toggle('linkBlending', true, set);
  let on = true;
  set(on);
  stage.every(2400, () => set((on = !on)));
  return () => stage.dispose();
};

export default mount;
