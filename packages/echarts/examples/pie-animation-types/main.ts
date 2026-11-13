// animationType (first draw) and animationTypeUpdate (data change) for a pie
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { intro: 'scale', update: 'transition', elastic: true };
  let values = SOURCES.map((d) => d.value);
  const apply = (): void => {
    chart.setOption({
      legend: ctx.preview ? { show: false } : {},
      series: [
        {
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['50%', ctx.preview ? '50%' : '46%'],
          // First draw: 'expansion' sweeps the sectors open, 'scale' grows the pie from its centre.
          animationType: look.intro,
          // Data change: 'transition' moves each sector's angles, 'expansion' redraws the whole pie.
          animationTypeUpdate: look.update,
          // 'scale' pairs with an elastic easing for a pop-up effect.
          animationEasing: look.elastic ? 'elasticOut' : 'cubicOut',
          animationDuration: 900,
          animationDurationUpdate: 900,
          label: { show: !ctx.preview },
          data: SOURCES.map((d, i) => ({ name: d.name, value: values[i]! })),
        },
      ],
    });
  };
  const shuffle = (): void => {
    values = SOURCES.map((d) => Math.round(d.value * (0.3 + Math.random() * 1.4)));
    apply();
  };
  // Clearing the chart makes the next setOption play the first-draw animation again.
  const replay = (): void => {
    chart.clear();
    apply();
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(1600, () => {
      n += 1;
      look.update = n % 4 < 2 ? 'transition' : 'expansion';
      if (n % 4 === 0) {
        look.intro = look.intro === 'scale' ? 'expansion' : 'scale';
        replay();
      } else shuffle();
    });
  } else {
    select(bar!, 'animationType', ['scale', 'expansion'], (v) => { look.intro = v; replay(); });
    select(bar!, 'animationTypeUpdate', ['transition', 'expansion'], (v) => { look.update = v; });
    const easing = button(bar!, 'elasticOut easing: on', () => {
      look.elastic = !look.elastic;
      easing.textContent = `elasticOut easing: ${look.elastic ? 'on' : 'off'}`;
      replay();
    });
    button(bar!, 'Change data', shuffle);
    button(bar!, 'Replay intro', replay);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
