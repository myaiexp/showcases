// Layout options for scene compilation: a custom measureText decides label widths
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import type { ChartTextMeasurer } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

// A glyph is `factor` times the font size wide: a stand-in for a real font engine.
const monospace =
  (factor: number): ChartTextMeasurer =>
  (text, o) => {
    const width = text.length * o.fontSize * factor;
    // x is the glyph box's left edge relative to the anchor: an end-anchored label reaches left.
    return { x: o.anchor === 'end' ? -width : o.anchor === 'middle' ? -width / 2 : 0, y: -o.fontSize * 0.8, width, height: o.fontSize };
  };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same chart, three measurers: only the left margin and plot width change.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const definition = defineChart({
    marks: [barY(revenue.map((r) => ({ ...r, revenue: r.revenue * 1000 })), { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue (USD)' } } },
  });
  const cases = [['narrow 0.3', monospace(0.3)], ['default', undefined], ['wide 1.0', monospace(1)]] as const;
  stage.box.style.display = 'grid';
  stage.box.style.gridTemplateColumns = 'repeat(3, 1fr)';
  stage.box.style.gap = '6px';
  const lines: string[] = [];
  for (const [name, measureText] of cases) {
    const scene = createChartScene(definition, { width: 300, height: stage.height }, { measureText });
    const cell = document.createElement('div');
    cell.innerHTML = renderChartSvg(scene, { ariaLabel: `Revenue, ${name} measurer`, idPrefix: stage.id(name.split(' ')[0]!) });
    stage.box.append(cell);
    lines.push(`${name}: left margin ${scene.margin.left.toFixed(0)} px, plot ${scene.chart.width.toFixed(0)} px wide`);
  }
  if (readout) readout.textContent = lines.join('\n');
  else stage.say(lines.map((l) => l.replace(': left margin ', ' ')).join('  '));
  return () => stage.dispose();
};

export default mount;
