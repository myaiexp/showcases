// interactiveColorLegend: a controlled list of visible series, filtered after scale resolution
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { interactiveColorLegend } from '@tanstack/charts/legend';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a legend button: the y axis keeps its domain when a line is hidden.' });
  // The legend buttons use the system colors canvas and canvastext: tell the browser this page is dark.
  stage.box.style.colorScheme = 'dark';
  let visible: readonly string[] = packageNames;
  const build = () =>
    defineChart({
      marks: [lineY(downloads, { x: 'week', y: 'downloads', color: 'package', strokeWidth: 2.5 })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: {
        domain: packageNames,
        range: packageColors,
        legend: interactiveColorLegend<string>({
          visible: controlledSignal(visible, (next) => { visible = next; set(); }),
          placement: 'bottom',
          ...(stage.preview ? { itemWidth: 72 } : {}),
          ariaLabel: 'Package visibility',
        }),
      },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Weekly downloads for three packages' });
  const host = stage.own(mountChart(stage.box, options()));
  function set(): void {
    host.update(options());
    stage.say(`visible: ${visible.join(', ') || 'none'}`);
  }
  if (stage.preview) stage.cycle([['core', 'react', 'octane'], ['core', 'octane'], ['octane'], ['react', 'octane']], 1600, (v) => { visible = v; set(); });
  return () => stage.dispose();
};

export default mount;
