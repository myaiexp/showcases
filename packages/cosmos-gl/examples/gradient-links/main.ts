// linkColorInterpolateFromEndpoints blends source to target color
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, hsl } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Link colors from setLinkColors are overridden while the gradient is on.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 12, fitViewPadding: 0.1, linkDefaultWidth: 4, linkColorInterpolateFromEndpoints: false, transitionDuration: 0 },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  // Hue by position around the web, lightness by ring, so every link joins two different colors.
  graph.setPointColors(colors(w.data.count, (i) => hsl(i === 0 ? 0 : ((i - 1) % 8) * 45, i === 0 ? 0 : 0.85, 0.35 + (w.data.group[i] ?? 0) * 0.12)));
  graph.setLinks(w.data.links);
  graph.setLinkColors(colors(w.linkCount, () => [0.6, 0.6, 0.6, 1]));
  graph.render();

  const set = (on: boolean) => {
    graph.setConfigPartial({ linkColorInterpolateFromEndpoints: on });
    stage.say(`linkColorInterpolateFromEndpoints: ${on}${on ? ' — each link runs from its source color to its target color' : ' — every link is the grey from setLinkColors'}`);
  };
  stage.toggle('linkColorInterpolateFromEndpoints', false, set);
  let on = false;
  set(on);
  stage.every(2400, () => set((on = !on)));
  return () => stage.dispose();
};

export default mount;
