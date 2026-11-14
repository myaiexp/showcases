// Band alignment: marks sit at the band centre; bar inset trims pixels from both edges after layout
import { barY, defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { alphabet } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dots mark each band centre. Inset and padding change the bar width, not the centre.' });
  let inset = 0;
  let padding = 0.2;

  const build = () =>
    defineChart({
      marks: [
        barY(alphabet, { x: 'letter', y: 'frequency', inset, fillOpacity: 0.6 }),
        dot(alphabet, { x: 'letter', y: () => 0, r: 4, fill: '#facc15' }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().padding(padding) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Letter frequency with band centres' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    slider(stage.bar, 'inset', 0, 20, 1, inset, (v) => { inset = v; refresh(); }, (v) => `${v}px`);
    slider(stage.bar, 'padding', 0, 0.8, 0.05, padding, (v) => { padding = v; refresh(); }, (v) => v.toFixed(2));
  } else {
    stage.cycle([[0, 0.2], [8, 0.2], [0, 0.6]] as const, 1600, ([i, p]) => { inset = i; padding = p; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
