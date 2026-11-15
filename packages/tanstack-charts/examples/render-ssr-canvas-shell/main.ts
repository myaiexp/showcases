// Server shells for canvas: markup and canvases exist first, pixels arrive on mount
import { areaY, createChartAdapter, createChartRendererAdapter, defineChart, lineY } from '@tanstack/charts';
import { canvasChartRenderer, createCanvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

function painted(source: HTMLCanvasElement): number {
  if (!source.width || !source.height) return 0;
  const probe = document.createElement('canvas');
  probe.width = 64;
  probe.height = 32;
  const g = probe.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(source, 0, 0, 64, 32);
  const data = g.getImageData(0, 0, 64, 32).data;
  let n = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i]! > 0) n++;
  return n;
}

type Kind = 'canvas' | 'mixed';
const kinds: readonly (readonly [Kind, string])[] = [['canvas', 'canvas renderer adapter'], ['mixed', 'SVG adapter, one canvas mark']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'First the shell (no pixels), then the mounted chart.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;
  let current: { destroy(): void } | null = null;
  stage.onDispose(() => current?.destroy());
  const scales = { x: { scale: () => scalePoint<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } };

  const run = (kind: Kind): void => {
    current?.destroy();
    stage.box.replaceChildren();
    const common = { height: stage.height, initialWidth: 480, ariaLabel: 'Revenue' };
    const adapter =
      kind === 'canvas'
        ? createChartRendererAdapter({ ...common, renderer: createCanvasChartRenderer<Revenue, string, number>(), definition: defineChart({ marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 })], scales }) })
        : createChartAdapter({ ...common, definition: defineChart({ marks: [areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.3, renderer: canvasChartRenderer }), lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 })], scales }) } as never);
    current = adapter;
    stage.box.innerHTML = adapter.prerender();
    const canvases = [...stage.box.querySelectorAll('canvas')];
    const before = `shell: ${canvases.length} canvases (${canvases.filter((c) => c.getAttribute('aria-hidden') === 'true').length} aria-hidden), ${stage.box.querySelectorAll('svg').length} svg, painted pixels ${canvases.reduce((s, c) => s + painted(c), 0)}`;
    if (readout) readout.textContent = before;
    else stage.say(before);
    stage.after(900, () => {
      adapter.mount(stage.box);
      stage.after(200, () => {
        const after = [...stage.box.querySelectorAll('canvas')];
        const text = `${before}\nmounted: ${after.length} canvases, ${stage.box.querySelectorAll('svg').length} svg, painted pixels ${after.reduce((s, c) => s + painted(c), 0)}`;
        if (readout) readout.textContent = text;
        else stage.say(text.replace('\n', '; '));
      });
    });
  };
  run('canvas');
  if (stage.bar) select(stage.bar, 'adapter', kinds, run);
  else stage.every(3600, (() => { let k = 0; return () => run(kinds[++k % 2]![0]); })());
  return () => stage.dispose();
};

export default mount;
