// fitViewOnInit and its delay, duration, padding and target options
import { Graph, type GraphConfig } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rebuilder } from '../../shared/rebuild.ts';
import { resetZoom } from '../../shared/reset-zoom.ts';
import { CENTER, mesh } from '../../shared/data.ts';
import { colors, paletteColor } from '../../shared/color.ts';

type Mode = 'default' | 'slow' | 'padding' | 'off' | 'rect' | 'indices';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'These options are read once, when the graph is created: each choice builds the graph again.' });
  const data = mesh(24, 16, 10);
  const build = rebuilder(stage);

  // The fixed grid keeps the fit target still: no layout runs after the first frame.
  const base: GraphConfig = { pointDefaultSize: 6, linkDefaultColor: '#4a505c', enableSimulation: false, rescalePositions: false };
  const column = (cols: number): number[] => {
    const out: number[] = [];
    for (let i = 0; i < data.count; i++) if (i % 24 < cols) out.push(i);
    return out;
  };
  const modes: Record<Mode, { label: string; config: GraphConfig }> = {
    default: { label: 'fitViewOnInit: true (defaults: delay 250, duration 250, padding 0.1)', config: {} },
    slow: { label: 'fitViewDelay: 1200, fitViewDuration: 1500', config: { fitViewDelay: 1200, fitViewDuration: 1500 } },
    padding: { label: 'fitViewPadding: 0.25', config: { fitViewPadding: 0.25 } },
    off: { label: 'fitViewOnInit: false (the view stays at zoom 1)', config: { fitViewOnInit: false } },
    rect: {
      label: 'fitViewByPointsInRect: [[left, bottom], [right, top]] in graph space',
      config: { fitViewDelay: 500, fitViewDuration: 900, fitViewByPointsInRect: [[CENTER - 120, CENTER - 80], [CENTER - 30, CENTER - 10]] },
    },
    indices: {
      label: 'fitViewByPointIndices: the first 5 columns',
      config: { fitViewDelay: 500, fitViewDuration: 900, fitViewByPointIndices: column(5), highlightedPointIndices: column(5), pointGreyoutOpacity: 0.4 },
    },
  };

  let current: Mode = 'default';
  const run = (mode: Mode): void => {
    current = mode;
    resetZoom(stage.div);
    const graph = build.adopt(new Graph(stage.div, { ...base, ...modes[mode].config }, build.device));
    graph.setPointPositions(data.positions);
    graph.setPointColors(colors(data.count, (i) => paletteColor(data.group[i] ?? 0)));
    graph.setLinks(data.links);
    graph.render();
    stage.say(modes[mode].label);
  };

  stage.select(
    'Init option',
    (Object.keys(modes) as Mode[]).map((m) => ({ value: m, label: modes[m].label })),
    'default',
    run,
  );
  stage.button('Build the graph again', () => run(current));
  run('default');

  const order: Mode[] = ['default', 'padding', 'rect', 'indices', 'off'];
  if (stage.preview) {
    let n = 0;
    stage.every(4200, () => run(order[++n % order.length] ?? 'default'));
  }
  return () => stage.dispose();
};

export default mount;
