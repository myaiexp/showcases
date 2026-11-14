// boxY options: inset, r, strokeWidth and paint
import { boxY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ A: [50, 10, 60], B: [62, 18, 60], C: [45, 8, 60] }, 41);

interface Style {
  inset: number;
  r: number;
  thick: boolean;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let style: Style = { inset: 0, r: 3, thick: false };

  const chart = (s: Style) =>
    defineChart({
      marks: [
        boxY(rows, {
          x: 'group',
          y: 'value',
          inset: s.inset,
          r: s.r,
          strokeWidth: s.thick ? 3 : undefined,
          fill: '#c084fc',
          fillOpacity: 0.3,
          stroke: '#c084fc',
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(style), height: stage.height, initialWidth: 640, ariaLabel: 'Boxplots with adjustable styling' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (next: Style): void => {
    style = next;
    host.update({ ...options, definition: chart(style) });
  };

  if (stage.bar) {
    slider(stage.bar, 'inset', 0, 30, 1, 0, (inset) => show({ ...style, inset }), (v) => `${v}px`);
    slider(stage.bar, 'r', 1, 10, 1, 3, (r) => show({ ...style, r }), (v) => `${v}px`);
    checkbox(stage.bar, 'strokeWidth: 3', false, (thick) => show({ ...style, thick }));
  } else
    stage.cycle<Style>([{ inset: 0, r: 3, thick: false }, { inset: 14, r: 6, thick: false }, { inset: 6, r: 3, thick: true }], 1800, show);
  return () => stage.dispose();
};

export default mount;
