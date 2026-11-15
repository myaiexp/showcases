// A scale factory infers its domain from the marks; a configured instance keeps the domain you set
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With the fixed domain the bars shrink with the data; with the inferred one the axis rescales.' });
  let factor = 1;
  let fixed = false;

  const build = () => {
    const rows = signups.map((r) => ({ ...r, value: r.value * factor }));
    return defineChart({
      marks: [barY(rows, { x: 'month', y: 'value' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: {
          scale: fixed ? scaleLinear().domain([0, 100]) : scaleLinear,
          nice: true,
          grid: true,
          axis: { label: fixed ? 'scaleLinear().domain([0, 100])' : 'scaleLinear (factory)' },
        },
      },
      tooltip,
    });
  };

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Signups' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    checkbox(stage.bar, 'fixed domain', fixed, (v) => { fixed = v; refresh(); });
    slider(stage.bar, 'data scale', 0.2, 1.5, 0.05, 1, (v) => { factor = v; refresh(); }, (v) => `${Math.round(v * 100)}%`);
  } else {
    stage.cycle([[false, 1], [false, 0.4], [true, 0.4], [true, 1]] as const, 1500, ([f, k]) => { fixed = f; factor = k; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
