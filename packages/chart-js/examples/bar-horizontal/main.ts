// Job titles with long names read better as horizontal bars (indexAxis: 'y')
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const JOBS = [
  'Senior Software Engineer',
  'Marketing Campaign Manager',
  'Customer Support Specialist',
  'Data Privacy Officer',
  'Warehouse Operations Lead',
  'Graphic and Motion Designer',
];
const SALARY = [78, 61, 42, 69, 48, 52];
const AXES = ['y', 'x'] as const;
type Axis = (typeof AXES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  let chart: Chart | null = null;

  // bar.md § Horizontal Bar Chart: indexAxis 'y' puts the categories on the vertical axis,
  // so the long names get a whole row each. The chart is rebuilt because the axes swap roles.
  const draw = (axis: Axis): void => {
    chart?.destroy();
    chart = new Chart(stage.canvas, {
      type: 'bar',
      data: {
        labels: JOBS,
        datasets: [
          { label: 'Median salary (k€)', data: SALARY, backgroundColor: alpha(C.green, 0.6), borderColor: C.green, borderWidth: 1 },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: axis,
        plugins: { legend: { display: false } },
      },
    });
    label.textContent = `indexAxis: '${axis}'`;
  };
  draw('y');

  if (bar) select(bar, 'indexAxis', AXES, 'y', draw);
  const stop = ctx.preview ? cycle(AXES, 2600, draw) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
