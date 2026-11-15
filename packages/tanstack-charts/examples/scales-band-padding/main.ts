// Band scale padding: paddingInner is the gap between bars, paddingOuter the gap at both ends
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { alphabet } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let inner = 0.12;
  let outer = 0.06;

  const build = () =>
    defineChart({
      marks: [barY(alphabet, { x: 'letter', y: 'frequency' })],
      scales: {
        x: { scale: () => scaleBand<string>().paddingInner(inner).paddingOuter(outer) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Letter frequency' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`paddingInner ${inner.toFixed(2)}, paddingOuter ${outer.toFixed(2)}`);
  };
  if (stage.bar) {
    slider(stage.bar, 'paddingInner', 0, 0.9, 0.02, inner, (v) => { inner = v; refresh(); }, (v) => v.toFixed(2));
    slider(stage.bar, 'paddingOuter', 0, 0.9, 0.02, outer, (v) => { outer = v; refresh(); }, (v) => v.toFixed(2));
  } else {
    stage.cycle([[0.12, 0.06], [0.5, 0.25], [0.02, 0], [0.7, 0.5]] as const, 1500, ([i, o]) => { inner = i; outer = o; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
