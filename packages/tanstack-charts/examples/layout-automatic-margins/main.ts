// Automatic margins: the layout solver measures tick labels, rotation and titles, and the plot rectangle follows
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const short = ['North', 'South', 'East', 'West', 'Centre'];
const long = ['North Atlantic coast', 'South Pacific islands', 'East African highlands', 'West Siberian plain', 'Central Asian steppe'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let useLong = true;
  let rotate = -35;
  let title = true;

  const build = () =>
    defineChart({
      marks: [barY((useLong ? long : short).map((name, i) => ({ name, value: [14, 22, 9, 17, 12][i]! })), { x: 'name', y: 'value' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2), axis: { tickLabels: { rotate }, label: title ? 'Region' : undefined } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: title ? 'Value (millions)' : undefined } },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Values by region', onRender: ({ scene }: { scene: { chart: { x: number; y: number; width: number; height: number } } }) => {
    const c = scene.chart;
    stage.say(`plot rectangle: x ${c.x.toFixed(0)}, y ${c.y.toFixed(0)}, ${c.width.toFixed(0)} x ${c.height.toFixed(0)}`);
  } });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    checkbox(stage.bar, 'long labels', useLong, (v) => { useLong = v; refresh(); });
    slider(stage.bar, 'rotate', -90, 0, 5, rotate, (v) => { rotate = v; refresh(); }, (v) => `${v} deg`);
    checkbox(stage.bar, 'axis titles', title, (v) => { title = v; refresh(); });
  } else {
    stage.cycle([[false, 0, false], [true, -35, true], [true, -80, true]] as const, 1800, ([l, r, t]) => { useLong = l; rotate = r; title = t; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
