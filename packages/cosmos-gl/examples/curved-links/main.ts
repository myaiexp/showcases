// curvedLinks bends links; segments, weight, control distance shape them
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Segments are how many straight pieces draw the curve.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 8, fitViewPadding: 0.1, linkDefaultColor: '#aab3c4', linkDefaultWidth: 2, curvedLinks: true, curvedLinkSegments: 19, curvedLinkWeight: 0.8, curvedLinkControlPointDistance: 0.5 },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.render();

  const cfg = { curvedLinks: true, curvedLinkSegments: 19, curvedLinkWeight: 0.8, curvedLinkControlPointDistance: 0.5 };
  const apply = (patch: Partial<typeof cfg>) => {
    Object.assign(cfg, patch);
    graph.setConfigPartial(cfg);
    stage.say(cfg.curvedLinks ? `curvedLinks: true · segments ${cfg.curvedLinkSegments} · weight ${cfg.curvedLinkWeight} · control point distance ${cfg.curvedLinkControlPointDistance}` : 'curvedLinks: false (straight lines)');
  };
  stage.toggle('curvedLinks', true, (v) => apply({ curvedLinks: v }));
  stage.slider('curvedLinkSegments', 1, 30, 1, 19, (v) => apply({ curvedLinkSegments: v }));
  stage.slider('curvedLinkWeight', 0, 2, 0.05, 0.8, (v) => apply({ curvedLinkWeight: v }));
  stage.slider('curvedLinkControlPointDistance', 0, 1.5, 0.05, 0.5, (v) => apply({ curvedLinkControlPointDistance: v }));
  stage.cycle(
    [
      { run: () => apply({ curvedLinks: false }) },
      { run: () => apply({ curvedLinks: true, curvedLinkControlPointDistance: 0.5 }) },
      { run: () => apply({ curvedLinkControlPointDistance: 1.2 }) },
      { run: () => apply({ curvedLinkControlPointDistance: 0.5, curvedLinkSegments: 3 }) },
      { run: () => apply({ curvedLinkSegments: 19 }) },
    ],
    2000,
  );
  return () => stage.dispose();
};

export default mount;
