// Two funnel series on the same area: the plan as a faint backdrop, the result drawn in front
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { STAGES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  let actual = STAGES.map((s) => s.actual);
  const look = { gap: 2 };
  const layout = {
    left: '10%',
    width: '80%',
    top: ctx.preview ? 8 : 20,
    bottom: ctx.preview ? 8 : 50,
    // Both series share min, max and sort 'none', so a value has the same width in either.
    min: 0,
    max: 100,
    sort: 'none' as const,
  };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{a}<br/>{b}: {c}' },
      legend: ctx.preview ? { show: false } : { data: ['Expected', 'Actual'] },
      series: [
        {
          ...layout,
          name: 'Expected',
          type: 'funnel',
          gap: look.gap,
          label: { show: false },
          itemStyle: { opacity: 0.35, borderWidth: 0 },
          emphasis: { disabled: true },
          data: STAGES.map((s) => ({ name: s.name, value: s.expected })),
        },
        {
          ...layout,
          name: 'Actual',
          type: 'funnel',
          gap: look.gap,
          // A narrower layer in front: the later series is drawn on top.
          maxSize: '70%',
          label: { show: true, position: 'inside', formatter: '{b} {c}', fontSize: ctx.preview ? 10 : 12 },
          itemStyle: { borderColor: '#1b1f27', borderWidth: 1 },
          data: STAGES.map((s, i) => ({ name: s.name, value: actual[i]! })),
        },
      ],
    });
  };
  const reroll = (): void => {
    let v = 100;
    actual = STAGES.map((s, i) => {
      if (i > 0) v = Math.max(3, Math.min(s.expected, Math.round(v * (0.45 + Math.random() * 0.5))));
      return v;
    });
    apply();
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1500, reroll);
  } else {
    button(bar!, 'Roll new actuals', reroll);
    slider(bar!, 'gap', [0, 12, 1], look.gap, (v) => { look.gap = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
