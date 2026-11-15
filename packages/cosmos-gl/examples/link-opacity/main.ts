// linkOpacity multiplies every link's alpha; renderLinks hides links
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { webLinks } from '../../shared/static-layouts.ts';
import { colors, paletteColor } from '../../shared/color.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Points are never affected; only links fade or disappear.' });
  const w = webLinks(8, 3);
  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultSize: 8, fitViewPadding: 0.1, linkDefaultColor: '#ffd08a', linkDefaultWidth: 2.5, linkOpacity: 1, renderLinks: true },
      stage.device(),
    ),
  );
  graph.setPointPositions(w.data.positions);
  graph.setPointColors(colors(w.data.count, (i) => paletteColor(w.data.group[i] ?? 0)));
  graph.setLinks(w.data.links);
  graph.render();

  let opacity = 1;
  let render = true;
  const apply = () => {
    graph.setConfigPartial({ linkOpacity: opacity, renderLinks: render });
    stage.say(`linkOpacity: ${opacity} · renderLinks: ${render}`);
  };
  stage.slider('linkOpacity', 0, 1, 0.05, 1, (v) => ((opacity = v), apply()));
  stage.toggle('renderLinks', true, (v) => ((render = v), apply()));
  const steps: [number, boolean][] = [[1, true], [0.5, true], [0.15, true], [1, false]];
  stage.cycle(steps.map(([o, r]) => ({ run: () => ((opacity = o), (render = r), apply()) })), 1800);
  return () => stage.dispose();
};

export default mount;
