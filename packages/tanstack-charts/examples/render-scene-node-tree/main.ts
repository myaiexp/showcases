// The renderer-neutral scene printed as an indented tree of node kinds and keys
import { barY, createChartScene, defineChart, dot, lineY, renderChartSvg } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const yAxis = { scale: scaleLinear, nice: true, grid: true } as const;
const definitions = [
  ['bars', defineChart({ marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })], scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: yAxis } })],
  ['line and dots', defineChart({ marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#fb923c' }), dot(revenue, { x: 'month', y: 'revenue', r: 4 })], scales: { x: { scale: () => scalePoint<string>().padding(0.3) }, y: yAxis } })],
] as const;

function tree(nodes: readonly SceneNode[], depth = 0, out: string[] = []): string[] {
  for (const n of nodes) {
    const geo = n.kind === 'rect' ? ` ${n.width.toFixed(0)}x${n.height.toFixed(0)}` : n.kind === 'label' ? ` "${n.text}"` : n.kind === 'polyline' ? ` ${n.points.length} points` : '';
    out.push(`${'  '.repeat(depth)}${n.kind} ${n.key}${geo}`);
    if (n.kind === 'group') tree(n.children, depth + 1, out);
  }
  return out;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every node has a key; groups hold children, translated and clipped.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();

  const show = ([name, definition]: (typeof definitions)[number]): void => {
    const scene = createChartScene(definition, { width: 560, height: stage.preview ? stage.height : 240 });
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: name, idPrefix: stage.id('nt') });
    const lines = tree(scene.nodes);
    const text = `${name}: ${lines.length} nodes in total\n${lines.slice(0, 26).join('\n')}${lines.length > 26 ? `\n... ${lines.length - 26} more` : ''}`;
    if (readout) readout.textContent = text;
    else stage.say(`${name}: ${lines.length} nodes, first ${lines.slice(0, 3).join(' | ')}`);
  };
  show(definitions[0]);
  if (stage.bar) select(stage.bar, 'definition', definitions.map((d) => [d, d[0]] as const), show);
  else stage.cycle(definitions, 2200, show);
  return () => stage.dispose();
};

export default mount;
