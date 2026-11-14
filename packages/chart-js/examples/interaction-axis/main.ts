// Which direction counts when finding the nearest point: x only, y only, or both
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { ghostCursor } from '../../shared/config-data.ts';

const AXES = ['x', 'y', 'xy'] as const;
type Axis = (typeof AXES)[number];

// Hours slept the night before, and the mood rating (1-10) the next afternoon.
const NIGHTS = [
  [5.2, 3.4], [5.8, 5.1], [6.1, 4.2], [6.4, 6.3], [6.9, 5.6], [7.2, 7.4],
  [7.6, 6.2], [7.9, 8.1], [8.3, 7.1], [8.7, 8.8], [9.1, 7.6],
].map(([x, y]) => ({ x: x!, y: y! }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, "axis: 'x'");
  const ghost = ghostCursor();

  const chart = new Chart(stage.canvas, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Mood', data: NIGHTS, backgroundColor: alpha(C.purple, 0.8), borderColor: C.purple, pointRadius: 5, pointHoverRadius: 9 },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { min: 4.5, max: 10 }, y: { min: 2, max: 10 } },
      // interactions.md: axis picks which coordinates enter the distance.
      interaction: { mode: 'nearest', intersect: false, axis: 'x' },
      plugins: { legend: { display: false } },
    },
    plugins: ctx.preview ? [ghost.plugin] : [],
  });

  // The card's pointer rests at the x of one point and the y of another.
  const spot = (): { x: number; y: number } => {
    const data = chart.getDatasetMeta(0).data;
    return { x: data[2]!.x, y: data[8]!.y };
  };
  const setAxis = (axis: Axis): void => {
    // In place: options.hover reads this same object.
    chart.options.interaction!.axis = axis;
    note.textContent = `axis: '${axis}'`;
  };

  if (bar) select(bar, 'interaction.axis', AXES, 'x', setAxis);
  const stop = ctx.preview
    ? cycle(AXES, 2400, (axis) => {
        setAxis(axis);
        const { x, y } = spot();
        ghost.move(chart, x, y);
      })
    : () => {};
  if (ctx.preview) {
    // Wait a frame so the first layout exists, then rest the pointer for the first axis.
    requestAnimationFrame(() => {
      const { x, y } = spot();
      ghost.move(chart, x, y);
    });
  }

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
