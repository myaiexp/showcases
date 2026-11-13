// A doughnut with rounded sector corners (itemStyle.borderRadius) and gaps (padAngle)
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { padAngle: 4, radius: 12, corners: 'all four' };
  const apply = (): void => {
    // borderRadius takes one number for every corner or four: the two inner corners, then the two outer ones.
    const r = look.radius;
    const borderRadius = look.corners === 'all four' ? r : look.corners === 'outer only' ? [0, 0, r, r] : [r, r, 0, 0];
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: ctx.preview ? { show: false } : {},
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', ctx.preview ? '50%' : '45%'],
          // padAngle is the angle in degrees left empty between neighbouring sectors.
          padAngle: look.padAngle,
          itemStyle: { borderRadius },
          label: { show: !ctx.preview },
          data: SOURCES,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(1200, () => {
      n += 1;
      look.padAngle = [4, 0, 8, 2][n % 4]!;
      look.radius = [12, 0, 24, 6][n % 4]!;
      look.corners = ['all four', 'outer only', 'inner only', 'all four'][n % 4]!;
      apply();
    });
  } else {
    slider(bar!, 'padAngle', [0, 20, 1], look.padAngle, (v) => { look.padAngle = v; apply(); });
    slider(bar!, 'borderRadius', [0, 40, 1], look.radius, (v) => { look.radius = v; apply(); });
    select(bar!, 'rounded corners', ['all four', 'outer only', 'inner only'], (v) => { look.corners = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
