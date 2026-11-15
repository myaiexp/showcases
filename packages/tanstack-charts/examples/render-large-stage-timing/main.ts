// Stage-by-stage timing: source, preparation, scene compilation and SVG serialization
import { barX, createChartScene, defineChart, mountChart, rect, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

function run(n: number) {
  const t0 = performance.now();
  const source = cloud(n, 5);
  const t1 = performance.now();
  const counts = new Map<number, number>();
  for (const p of source) {
    const k = Math.min(29, Math.floor((p.y / 90) * 30)) * 40 + Math.min(39, Math.max(0, Math.floor((p.x / 90) * 40)));
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const cells = [...counts].map(([k, count]) => ({ x1: k % 40, x2: (k % 40) + 1, y1: Math.floor(k / 40), y2: Math.floor(k / 40) + 1, count }));
  const t2 = performance.now();
  const scene = createChartScene(defineChart({ marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'count' })], scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear } } }), { width: 640, height: 300 });
  const t3 = performance.now();
  const svg = renderChartSvg(scene, { ariaLabel: 'timing run' });
  const t4 = performance.now();
  const accounted = cells.reduce((s, c) => s + c.count, 0) === n;
  return { accounted, nodes: scene.nodes.length, bytes: svg.length, stages: [['source', t1 - t0], ['prepare', t2 - t1], ['scene', t3 - t2], ['svg string', t4 - t3]].map(([stage, ms]) => ({ stage: stage as string, ms: ms as number })) };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a row count: every run is valid only if the grid still accounts for every row.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const options = (n: number) => {
    const r = run(n);
    const text = `${n} rows, gate (every row accounted for): ${r.accounted ? 'pass' : 'FAIL'}\nscene nodes ${r.nodes}, svg ${r.bytes} characters`;
    if (readout) readout.textContent = text;
    else stage.say(text.replace('\n', ', '));
    return {
      definition: defineChart({
        marks: [barX(r.stages, { x: 'ms', y: 'stage', fill: '#60a5fa' })],
        scales: { x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'milliseconds' } }, y: { scale: () => scaleBand<string>().padding(0.25) } },
      }),
      height: stage.height,
      initialWidth: 560,
      ariaLabel: 'Milliseconds per stage',
    };
  };
  const sizes = [5000, 20000, 60000] as const;
  const host = stage.own(mountChart(stage.box, options(20000)));
  if (stage.bar) select(stage.bar, 'rows', sizes.map((n) => [n, n.toLocaleString('en-US')] as const), (n) => host.update(options(n)), 20000);
  else stage.cycle(sizes, 2400, (n) => host.update(options(n)));
  return () => stage.dispose();
};

export default mount;
