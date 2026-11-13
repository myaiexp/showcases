// Sunburst labels: rotate 'radial' / 'tangential' / degrees, align and minAngle
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { project } from '../../shared/hierarchy-data.ts';

const ROTATE = ['radial', 'tangential', '0', '45', '-45'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (rotate: string, align: string, minAngle: number): void => {
    chart.setOption({
      tooltip: { formatter: '{b}: {c} KB' },
      series: [
        {
          type: 'sunburst',
          data: project.children,
          radius: ['12%', '92%'],
          // Ring depth i uses levels[i + 1]; levels[0] is for the return-to-parent circle.
          levels: [
            {},
            { radius: ['12%', '34%'] },
            { radius: ['34%', '62%'] },
            { radius: ['62%', '92%'] },
          ],
          itemStyle: { borderColor: '#222', borderWidth: 1 },
          label: {
            // rotate: 'radial' lies along the radius, 'tangential' follows the arc, a number is degrees (-90..90).
            rotate: rotate === 'radial' || rotate === 'tangential' ? rotate : Number(rotate),
            // align: 'left' is the inner side of the sector, 'right' the outer side.
            align,
            // minAngle: sectors narrower than this many degrees get no label.
            minAngle,
            fontSize: ctx.preview ? 9 : 11,
          },
          animationDurationUpdate: 500,
        },
      ],
    });
  };

  let rotate = 'radial';
  let align = 'center';
  let minAngle = 8;
  render(rotate, align, minAngle);

  if (ctx.preview) {
    const modes = ['radial', 'tangential', '45', '0'];
    let i = 0;
    const stop = every(1800, () => {
      rotate = modes[++i % modes.length]!;
      render(rotate, align, minAngle);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'label.rotate', ROTATE, (v) => {
    rotate = v;
    render(rotate, align, minAngle);
  });
  select(bar!, 'label.align', ['center', 'left', 'right'], (v) => {
    align = v;
    render(rotate, align, minAngle);
  });
  slider(bar!, 'label.minAngle', [0, 30, 1], minAngle, (v) => {
    minAngle = v;
    render(rotate, align, minAngle);
  });

  return dispose;
};

export default mount;
