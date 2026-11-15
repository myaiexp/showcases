// Scene tests in the page: invariants asserted on createChartScene output, with a broken variant
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drop a row and read which assertions notice.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 58;
  const readout = stage.preview ? null : stage.readout();

  const run = (broken: boolean): void => {
    const rows = broken ? revenue.slice(0, 5) : revenue;
    const scene = createChartScene(
      defineChart({
        marks: [barY(rows, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
        scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      { width: 480, height: 180 },
    );
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: 'Revenue', idPrefix: stage.id('ta') });
    const months = revenue.map((r) => r.month);
    const checks: readonly (readonly [string, boolean])[] = [
      [`one point per source row (${scene.points.length} of ${revenue.length})`, scene.points.length === revenue.length],
      ['x domain is the six months', JSON.stringify(scene.scales.x?.domain) === JSON.stringify(months)],
      ['the plot has positive width and height', scene.chart.width > 0 && scene.chart.height > 0],
      ['point keys are unique', new Set(scene.points.map((p) => p.key)).size === scene.points.length],
      ['every point lies inside the plot', scene.points.every((p) => p.x >= scene.chart.x && p.x <= scene.chart.x + scene.chart.width)],
    ];
    const lines = checks.map(([name, ok]) => `${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (readout) readout.textContent = lines.join('\n');
    else stage.say(`${checks.filter((c) => c[1]).length} of ${checks.length} pass${broken ? ' (one row dropped)' : ''}`);
  };
  run(false);
  if (stage.bar) checkbox(stage.bar, 'drop the last row', false, run);
  else stage.cycle([false, true], 2200, run);
  return () => stage.dispose();
};

export default mount;
