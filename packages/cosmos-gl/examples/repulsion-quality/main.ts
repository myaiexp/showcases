// simulationRepulsionQuality precise, fast and auto on a graph above 25k points
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { communities, scatter } from '../../shared/data.ts';
import { keepFramed } from '../../shared/load.ts';
import { colors, paletteColor } from '../../shared/color.ts';

type Quality = 'auto' | 'precise' | 'fast';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The full view has 30,000 points: auto is fast here. Switch to precise and compare the frame rate.' });
  const groups = stage.preview ? 6 : 60;
  const data = communities(groups, stage.preview ? 250 : 500, 2, 2, 0.05);
  data.positions = scatter(data.count, stage.preview ? 300 : 800, 11);

  const graph = stage.own(
    new Graph(
      stage.div,
      {
        pointDefaultSize: stage.preview ? 3 : 1.5,
        linkDefaultColor: '#2c313b',
        simulationRepulsionQuality: 'auto',
        showFPSMonitor: !stage.preview,
        fitViewDelay: 1500,
      },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
  graph.setLinks(data.links);
  graph.render();
  keepFramed(stage, graph, 3500);

  const words: Record<Quality, string> = {
    auto: `auto: precise up to 25,000 points, fast above. This graph has ${data.count.toLocaleString('en')} points, so it runs ${data.count > 25000 ? 'fast' : 'precise'}.`,
    precise: 'precise: calm on clustered data while the layout is hot, about a third more work per step above 25,000 points.',
    fast: 'fast: cheaper above 25,000 points, but can shimmer until the layout cools.',
  };
  const apply = (q: Quality): void => {
    graph.setConfigPartial({ simulationRepulsionQuality: q });
    graph.start(0.8);
    stage.say(`simulationRepulsionQuality ${words[q]}`);
  };
  stage.select<Quality>(
    'simulationRepulsionQuality',
    [
      { value: 'auto', label: 'auto' },
      { value: 'precise', label: 'precise' },
      { value: 'fast', label: 'fast' },
    ],
    'auto',
    apply,
  );
  stage.say(`simulationRepulsionQuality ${words.auto}`);
  if (stage.preview) stage.cycle((['precise', 'fast', 'auto'] as const).map((q) => ({ run: () => apply(q) })), 4000);
  return () => stage.dispose();
};

export default mount;
