// interactiveColorLegend hover: 'series': inline mark states react to the series under the legend pointer
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { interactiveColorLegend } from '@tanstack/charts/legend';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover or focus a legend button: the other lines fade.' });
  // The legend buttons use the system colors canvas and canvastext: tell the browser this page is dark.
  stage.box.style.colorScheme = 'dark';
  let visible: readonly string[] = packageNames;
  const build = () =>
    defineChart({
      marks: [
        lineY(downloads, {
          x: 'week',
          y: 'downloads',
          color: 'package',
          strokeWidth: 2.5,
          states: [
            { when: ({ focus, matches }) => focus.source === 'legend' && !matches('series'), style: { opacity: 0.15 }, transition: { type: 'tween', duration: 150 } },
            { when: ({ focus, matches }) => focus.source === 'legend' && matches('series'), style: { strokeWidth: 4.5 }, transition: { type: 'tween', duration: 150 } },
          ],
        }),
      ],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: {
        domain: packageNames,
        range: packageColors,
        legend: interactiveColorLegend<string>({
          hover: 'series',
          visible: controlledSignal(visible, (next) => { visible = next; host.update(options()); }),
          placement: 'bottom',
          ...(stage.preview ? { itemWidth: 72 } : {}),
        }),
      },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Weekly downloads for three packages' });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.preview) stage.say('hover: "series" on the legend');
  return () => stage.dispose();
};

export default mount;
