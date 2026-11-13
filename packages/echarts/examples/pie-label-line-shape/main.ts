// Outside labels: avoidLabelOverlap, and the labelLine length, length2, smooth and minTurnAngle options
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { UNEVEN } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { avoid: true, length: 15, length2: 25, smooth: 0, minTurn: 90 };
  const apply = (): void => {
    chart.setOption({
      series: [
        {
          type: 'pie',
          radius: ctx.preview ? '55%' : '60%',
          center: ['50%', ctx.preview ? '50%' : '46%'],
          // On (the default), colliding labels are moved apart; off leaves them where the sectors put them.
          avoidLabelOverlap: look.avoid,
          label: { position: 'outside', formatter: '{b}', fontSize: ctx.preview ? 10 : 12 },
          labelLine: {
            show: true,
            length: look.length, // first segment, out of the sector
            length2: look.length2, // second segment, towards the text
            smooth: look.smooth, // 0 to 1, or true
            minTurnAngle: look.minTurn, // flatten the bend when it would turn less than this
            lineStyle: { width: 2 },
          },
          data: UNEVEN,
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps = [[10, 10, 0], [30, 40, 0.6], [5, 60, 1], [20, 20, 0]] as const;
    let n = 0;
    stop = every(1400, () => {
      n += 1;
      [look.length, look.length2, look.smooth] = steps[n % steps.length]!;
      apply();
    });
  } else {
    const avoid = button(bar!, 'avoidLabelOverlap: true', () => {
      look.avoid = !look.avoid;
      avoid.textContent = `avoidLabelOverlap: ${look.avoid}`;
      apply();
    });
    slider(bar!, 'length', [0, 60, 1], look.length, (v) => { look.length = v; apply(); });
    slider(bar!, 'length2', [0, 100, 1], look.length2, (v) => { look.length2 = v; apply(); });
    slider(bar!, 'smooth', [0, 1, 0.1], 0, (v) => { look.smooth = v; apply(); });
    slider(bar!, 'minTurnAngle', [0, 180, 5], look.minTurn, (v) => { look.minTurn = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
