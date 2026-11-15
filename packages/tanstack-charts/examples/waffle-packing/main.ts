// waffleY packing: responsive grid or fixed columns, with gap and radius
import { colorLegend, defineChart, mountChart } from '@tanstack/charts';
import { waffleY } from '@tanstack/charts/waffle';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { kind: 'Done', n: 46 },
  { kind: 'In review', n: 21 },
  { kind: 'Open', n: 33 },
];

interface Packing {
  columns: number | undefined;
  gap: number;
  radius: number;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let packing: Packing = { columns: undefined, gap: 2, radius: 3 };

  const chart = (p: Packing) =>
    defineChart({
      svgAnimation: true,
      marks: [waffleY(rows, { y: 'n', color: 'kind', ...p })],
      scales: { x: null, y: null },
      color: { legend: colorLegend() },
    });

  const options = { definition: chart(packing), height: stage.height, initialWidth: 640, ariaLabel: 'Ticket status as a waffle chart' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (next: Packing): void => {
    packing = next;
    host.update({ ...options, definition: chart(packing) });
    stage.say(`columns: ${packing.columns ?? 'responsive'}, gap: ${packing.gap}, radius: ${packing.radius}`);
  };

  if (stage.bar) {
    select(stage.bar, 'columns', [[undefined, 'responsive'], [5, '5'], [10, '10'], [20, '20']] as const, (columns) => show({ ...packing, columns }));
    slider(stage.bar, 'gap', 0, 8, 1, 2, (gap) => show({ ...packing, gap }), (v) => `${v}px`);
    slider(stage.bar, 'radius', 0, 10, 1, 3, (radius) => show({ ...packing, radius }), (v) => `${v}px`);
    stage.say('columns: responsive, gap: 2, radius: 3');
  } else
    stage.cycle<Packing>(
      [{ columns: undefined, gap: 2, radius: 3 }, { columns: 5, gap: 4, radius: 6 }, { columns: 20, gap: 1, radius: 0 }, { columns: 10, gap: 2, radius: 4 }],
      1800,
      show,
    );
  return () => stage.dispose();
};

export default mount;
