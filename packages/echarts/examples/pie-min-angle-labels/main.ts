// Tiny sectors: minAngle widens them, minShowLabelAngle hides the labels of narrow ones
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { UNEVEN } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { minAngle: 0, minShowLabelAngle: 0 };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: ctx.preview ? '70%' : '62%',
          center: ['50%', ctx.preview ? '50%' : '46%'],
          // The smallest angle in degrees a sector may have, so a 4-in-1200 slice stays clickable.
          minAngle: look.minAngle,
          // A sector narrower than this many degrees loses its label and guide line.
          minShowLabelAngle: look.minShowLabelAngle,
          label: { formatter: '{b}: {c}', fontSize: ctx.preview ? 10 : 12 },
          data: UNEVEN,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps = [[0, 0], [8, 0], [8, 12], [0, 12]] as const;
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      [look.minAngle, look.minShowLabelAngle] = steps[n % steps.length]!;
      apply();
    });
  } else {
    slider(bar!, 'minAngle', [0, 30, 1], 0, (v) => { look.minAngle = v; apply(); });
    slider(bar!, 'minShowLabelAngle', [0, 30, 1], 0, (v) => { look.minShowLabelAngle = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
