// pointDefaultColor fills every point that has no color of its own
import { Graph } from '@cosmos.gl/graph';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { web } from '../../shared/static-layouts.ts';
import { colors } from '../../shared/color.ts';

const OPTIONS = [
  { value: '#b3b3b3', label: "'#b3b3b3' (default)" },
  { value: '#ffb347', label: "'#ffb347' (hex string)" },
  { value: '0.45,0.9,0.6,1', label: '[0.45, 0.9, 0.6, 1] (RGBA array)' },
] as const;

const parse = (v: string): string | [number, number, number, number] =>
  v.startsWith('#') ? v : (v.split(',').map(Number) as [number, number, number, number]);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue inner points have their own color; every other point uses the default.' });
  const data = web(10, 3, 38);

  const graph = stage.own(
    new Graph(
      stage.div,
      { enableSimulation: false, pointDefaultColor: '#b3b3b3', pointDefaultSize: 12, linkDefaultColor: '#556', fitViewPadding: 0.2 },
      stage.device(),
    ),
  );
  graph.setPointPositions(data.positions);
  graph.setLinks(data.links);
  // The hub and first ring get blue; NaN channels mean "no color of my own".
  graph.setPointColors(colors(data.count, (i) => (i <= 10 ? [0.4, 0.7, 1, 1] : [NaN, NaN, NaN, NaN])));
  graph.render();

  const set = (v: string) => {
    graph.setConfigPartial({ pointDefaultColor: parse(v) });
    stage.say(`pointDefaultColor: ${OPTIONS.find((o) => o.value === v)?.label ?? v}`);
  };
  stage.select('pointDefaultColor', OPTIONS, '#b3b3b3', set);
  stage.say(`pointDefaultColor: ${OPTIONS[0].label}`);
  stage.cycle(OPTIONS.map((o) => ({ run: () => set(o.value) })), 2200);
  return () => stage.dispose();
};

export default mount;
