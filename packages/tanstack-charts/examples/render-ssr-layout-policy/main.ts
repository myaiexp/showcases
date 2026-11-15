// resolveChartAdapterLayout: options in, the size a server would render at, and that render
import { barY, createChartRuntime, defineChart, renderChartSvg, resolveChartAdapterLayout } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

type Opts = { width?: number; height?: number; initialWidth?: number; aspectRatio?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zero means "not set". Explicit width and height always win.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  const runtime = createChartRuntime<Revenue, string, number>();
  stage.onDispose(() => runtime.destroy());
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });

  const show = (o: Opts): void => {
    const layout = resolveChartAdapterLayout(o);
    const scene = runtime.render(definition, { width: layout.initialWidth, height: layout.initialHeight });
    stage.box.style.maxWidth = '100%';
    stage.box.style.width = `${Math.min(layout.initialWidth, stage.preview ? 300 : 640)}px`;
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: 'Revenue', idPrefix: stage.id('lp') });
    const given = Object.entries(o).filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join(', ') || 'nothing set';
    const text = `options: ${given}\nresolved: initialWidth ${layout.initialWidth}, initialHeight ${layout.initialHeight.toFixed(0)}, aspectRatio ${layout.aspectRatio ?? 'none'}`;
    if (readout) readout.textContent = text;
    else stage.say(text.replace('\n', ' -> '));
  };
  if (stage.bar) {
    const o: Opts = { initialWidth: 720, aspectRatio: 16 / 9 };
    const apply = (): void => show({ width: o.width || undefined, height: o.height || undefined, initialWidth: o.initialWidth || undefined, aspectRatio: o.aspectRatio || undefined });
    slider(stage.bar, 'width', 0, 800, 20, 0, (v) => { o.width = v; apply(); }, (v) => (v ? `${v}` : 'unset'));
    slider(stage.bar, 'height', 0, 400, 20, 0, (v) => { o.height = v; apply(); }, (v) => (v ? `${v}` : 'unset'));
    slider(stage.bar, 'initialWidth', 0, 800, 20, 720, (v) => { o.initialWidth = v; apply(); }, (v) => (v ? `${v}` : 'unset'));
    slider(stage.bar, 'aspectRatio', 0, 3, 0.25, 1.75, (v) => { o.aspectRatio = v; apply(); }, (v) => (v ? v.toFixed(2) : 'unset'));
    o.aspectRatio = 1.75;
    apply();
  } else stage.cycle<Opts>([{ width: 560 }, { initialWidth: 480, aspectRatio: 2 }, {}, { width: 360, height: 120 }], 1800, show);
  return () => stage.dispose();
};

export default mount;
