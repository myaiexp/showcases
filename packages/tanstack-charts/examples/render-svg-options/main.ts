// RenderChartSvgOptions: what each option does to the root svg of a static render
import { areaY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { slider, textInput } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const scene = createChartScene(
  defineChart({
    marks: [areaY(revenue, { x: 'month', y: 'revenue', fill: 'url(#wash)' })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.1) }, y: { scale: scaleLinear, nice: true, grid: true } },
    gradients: [{ id: 'wash', y1: 1, y2: 0, stops: [{ offset: 0, color: '#60a5fa', opacity: 0.1 }, { offset: 1, color: '#60a5fa', opacity: 0.8 }] }],
  }),
  { width: 640, height: 260 },
);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the options: the readout is read back from the inserted svg.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  const o = { ariaLabel: 'Revenue by month', ariaDescription: 'Revenue grew from January to June.', className: 'revenue-chart', tabIndex: 0, idPrefix: 'rev' };

  const render = (): void => {
    stage.box.innerHTML = renderChartSvg(scene, { ...o, ariaDescription: o.ariaDescription || undefined, className: o.className || undefined, idPrefix: o.idPrefix || undefined });
    const svg = stage.box.querySelector('svg')!;
    const text = [
      `role ${svg.getAttribute('role')}, aria-roledescription ${svg.getAttribute('aria-roledescription')}`,
      `aria-label "${svg.getAttribute('aria-label')}"`,
      `class "${svg.getAttribute('class')}", tabindex ${svg.getAttribute('tabindex')}`,
      `viewBox ${svg.getAttribute('viewBox')}, width ${svg.getAttribute('width')}, height ${svg.getAttribute('height')}`,
      `desc "${svg.querySelector('desc')?.textContent ?? '(none)'}"`,
      `ids ${[...svg.querySelectorAll('[id]')].map((n) => n.id).join(', ') || '(none)'}`,
    ].join('\n');
    if (readout) readout.textContent = text;
    else stage.say(`label "${o.ariaLabel}", class "${o.className}", ids ${[...svg.querySelectorAll('[id]')].map((n) => n.id).join(', ')}`);
  };
  render();
  if (stage.bar) {
    textInput(stage.bar, 'ariaLabel', o.ariaLabel, (v) => { o.ariaLabel = v; render(); }, 18);
    textInput(stage.bar, 'ariaDescription', o.ariaDescription, (v) => { o.ariaDescription = v; render(); }, 22);
    textInput(stage.bar, 'className', o.className, (v) => { o.className = v; render(); }, 12);
    textInput(stage.bar, 'idPrefix', o.idPrefix, (v) => { o.idPrefix = v; render(); }, 8);
    slider(stage.bar, 'tabIndex', -1, 3, 1, 0, (v) => { o.tabIndex = v; render(); });
  } else {
    const sets = [
      { ariaLabel: 'Revenue by month', className: 'revenue-chart', idPrefix: 'rev' },
      { ariaLabel: 'Half-year revenue', className: 'compact', idPrefix: 'half' },
      { ariaLabel: 'Sales trend', className: 'print', idPrefix: 'sales' },
    ];
    stage.cycle(sets, 1800, (s) => { Object.assign(o, s); render(); });
  }
  return () => stage.dispose();
};

export default mount;
