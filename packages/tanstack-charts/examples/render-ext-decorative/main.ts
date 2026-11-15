// decorative(): the area stays painted but is no longer a focus target
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { decorative } from '@tanstack/charts/mark/decorative';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover inside the area, with the wrapper on and off, and read which mark owns the tooltip.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  let wrapped = true;

  const options = () => {
    const area = areaY(revenue, { id: 'area', x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.25 });
    return {
      definition: defineChart({
        marks: [wrapped ? decorative(area) : area, lineY(revenue, { id: 'line', x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true })],
        scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
        tooltip,
      }),
      height: stage.height,
      initialWidth: 600,
      ariaLabel: 'Revenue with a decorative area',
    };
  };
  const host = stage.own(mountChart(stage.box, options()));
  const report = (): void => {
    const count = (id: string): number => host.getScene().points.filter((p) => p.markId === id).length;
    const text = `focus points: area ${count('area')}, line ${count('line')}`;
    if (readout) readout.textContent = text;
    else stage.say(wrapped ? `decorative(area): ${text}` : `plain area: ${text}`);
  };
  const set = (v: boolean): void => {
    wrapped = v;
    host.update(options());
    report();
  };
  report();
  if (stage.bar) checkbox(stage.bar, 'decorative(area)', true, set);
  else {
    stage.cycle([true, false], 2400, set);
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
