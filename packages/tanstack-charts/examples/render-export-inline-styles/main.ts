// Before and after: page-dependent paint in the mounted svg, concrete colors in the export
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { serializeChartSvg } from '@tanstack/charts/export';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const count = (text: string, needle: string): number => text.split(needle).length - 1;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Only the default palette and text colors are theme-dependent; explicit colors pass through.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();

  // No explicit colors: paint comes from the theme, which means currentColor and --ts-chart-N.
  const definition = defineChart({
    marks: [areaY(revenue, { x: 'month', y: 'revenue', fillOpacity: 0.25 }), lineY(revenue, { x: 'month', y: 'revenue', strokeWidth: 2 })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue with theme colors' }));
  stage.after(60, () => {
    const mounted = stage.box.querySelector('svg')!.outerHTML;
    const exported = serializeChartSvg(stage.box);
    const text = `mounted svg:    currentColor x${count(mounted, 'currentColor')}, var( x${count(mounted, 'var(')}\nserialized svg: currentColor x${count(exported, 'currentColor')}, var( x${count(exported, 'var(')}\nfirst text fill in the export: ${/<text[^>]*?fill="([^"]*)"/.exec(exported)?.[1] ?? 'inherited'}`;
    if (readout) readout.textContent = text;
    else stage.say(`currentColor ${count(mounted, 'currentColor')} to ${count(exported, 'currentColor')}, var( ${count(mounted, 'var(')} to ${count(exported, 'var(')}`);
  });
  return () => stage.dispose();
};

export default mount;
