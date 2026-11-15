// interactiveColorLegend: native buttons with aria-pressed, named group, labelled items
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { interactiveColorLegend } from '@tanstack/charts/legend';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { downloads, packageColors, packageNames } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press a legend button, or Tab to it and press Space.' });
  const readout = stage.bar ? stage.readout() : null;
  // The legend buttons use the system colors canvas and canvastext: tell the browser this page is dark.
  stage.box.style.colorScheme = 'dark';
  let visible: readonly string[] = packageNames;

  const build = () =>
    defineChart({
      marks: [lineY(downloads, { x: 'week', y: 'downloads', color: 'package', strokeWidth: 2.5 })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 1700]), grid: true } },
      color: {
        scale: scaleOrdinal<string, string>().domain(packageNames).range(packageColors),
        legend: interactiveColorLegend<string>({
          visible: controlledSignal(visible, (next) => { visible = next; refresh(); }),
          placement: 'bottom',
          ...(stage.preview ? { itemWidth: 72 } : {}),
          ariaLabel: 'Package visibility',
          itemAriaLabel: (value, { visible: shown }) => `${value}, ${shown ? 'shown' : 'hidden'}`,
        }),
      },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Weekly downloads for three packages' });
  const host = stage.own(mountChart(stage.box, options()));
  function refresh(): void {
    host.update(options());
    queueMicrotask(show);
  }
  function show(): void {
    if (!readout) return;
    const buttons = [...stage.box.querySelectorAll('button')];
    readout.textContent = buttons.length
      ? buttons.map((b) => `<button aria-pressed="${b.getAttribute('aria-pressed')}" aria-label="${b.getAttribute('aria-label')}">`).join('\n')
      : 'no legend buttons found';
  }
  stage.after(100, show);
  if (stage.preview) {
    const order = [['core', 'react', 'octane'], ['core', 'octane'], ['react', 'octane'], ['core', 'react', 'octane']];
    stage.cycle(order, 1500, (set) => { visible = set; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
