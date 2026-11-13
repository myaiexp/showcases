// Two radar components side by side, each with its own indicators, centre, radius and series
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const skills = [
  { name: 'Design', max: 10 },
  { name: 'Code', max: 10 },
  { name: 'Test', max: 10 },
  { name: 'Ops', max: 10 },
  { name: 'Docs', max: 10 },
];
const budget = [
  { name: 'Sales', max: 6500 },
  { name: 'Admin', max: 16000 },
  { name: 'IT', max: 30000 },
  { name: 'Support', max: 38000 },
  { name: 'R&D', max: 52000 },
  { name: 'Marketing', max: 25000 },
];
const rnd = (max: number): number => Math.round(max * (0.3 + Math.random() * 0.65));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });
  let shapeLeft = 'polygon';
  let shapeRight = 'circle';
  let skillValue = [8, 6, 5, 4, 7];
  let budgetValue = [4300, 10000, 28000, 35000, 50000, 19000];

  const show = (): void => {
    chart.setOption({
      title: ctx.preview
        ? undefined
        : [
            { text: 'Skills', left: '25%', top: 4, textAlign: 'center', textStyle: { fontSize: 14 } },
            { text: 'Budget', left: '75%', top: 4, textAlign: 'center', textStyle: { fontSize: 14 } },
          ],
      // An array of radar components: each one is its own coordinate system, with its own
      // indicators, shape, centre and radius. Series pick one through radarIndex.
      radar: [
        {
          indicator: skills,
          shape: shapeLeft,
          center: ['25%', '55%'],
          radius: ctx.preview ? '48%' : '58%',
          axisName: { fontSize: ctx.preview ? 10 : 12 },
        },
        {
          indicator: budget,
          shape: shapeRight,
          center: ['75%', '55%'],
          radius: ctx.preview ? '48%' : '58%',
          axisName: { fontSize: ctx.preview ? 10 : 12 },
        },
      ],
      series: [
        { type: 'radar', radarIndex: 0, name: 'Team', data: [{ value: skillValue, name: 'Team', areaStyle: { opacity: 0.3 } }] },
        { type: 'radar', radarIndex: 1, name: 'Spending', data: [{ value: budgetValue, name: 'Spending', areaStyle: { opacity: 0.3 } }], itemStyle: { color: '#91cc75' }, lineStyle: { color: '#91cc75' } },
      ],
    });
  };
  const redraw = (): void => {
    skillValue = skills.map((s) => rnd(s.max));
    budgetValue = budget.map((s) => rnd(s.max));
    show();
  };
  show();

  const stop = every(ctx.preview ? 1800 : 3000, redraw);
  if (bar) {
    select(bar, 'left radar.shape', ['polygon', 'circle'], (v) => {
      shapeLeft = v;
      show();
    });
    select(bar, 'right radar.shape', ['circle', 'polygon'], (v) => {
      shapeRight = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
