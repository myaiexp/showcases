// label.rotate on a pie: radial, tangential, a fixed angle, inside or outside the sectors
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { SOURCES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { rotate: 'radial' as string | number, position: 'inside', angle: 30 };
  const apply = (): void => {
    chart.setOption({
      series: [
        {
          type: 'pie',
          radius: ['25%', '70%'],
          center: ['50%', ctx.preview ? '50%' : '48%'],
          label: {
            position: look.position,
            // true or 'radial' follows the radius, 'tangential' follows the arc ('tangential-noflip' never
            // turns the text upside down), a number is an angle in degrees between -90 and 90.
            rotate: look.rotate === 'number' ? look.angle : look.rotate,
            fontSize: ctx.preview ? 11 : 14,
            formatter: '{b}',
          },
          itemStyle: { borderColor: '#1b1f27', borderWidth: 2 },
          data: SOURCES,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const modes = ['radial', 'tangential', 'tangential-noflip', 'number'];
    let n = 0;
    stop = every(1400, () => {
      n += 1;
      look.rotate = modes[n % modes.length]!;
      look.angle = [30, -45, 60, 0][n % 4]!;
      apply();
    });
  } else {
    select(bar!, 'rotate', ['radial', 'tangential', 'tangential-noflip', 'number'], (v) => { look.rotate = v; apply(); });
    slider(bar!, 'angle (when number)', [-90, 90, 5], look.angle, (v) => { look.angle = v; apply(); });
    select(bar!, 'position', ['inside', 'outside'], (v) => { look.position = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
