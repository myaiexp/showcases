// A motion callback: enter delays by index, forecast rows on a tween, the rest on the renderer spring
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press change data: May and June use a linear tween, the other bars a spring.' });
  let scale = 1;
  const build = () => {
    const rows = revenue.map((r, i) => ({ ...r, revenue: Math.round(r.revenue * (i % 2 ? scale : 2 - scale)), status: i >= 4 ? 'forecast' : 'actual' }));
    return defineChart({
      marks: [
        barY(rows, {
          x: 'month',
          y: 'revenue',
          key: 'id',
          fill: (d) => (d.status === 'forecast' ? '#fbbf24' : '#60a5fa'),
          motion(context) {
            if (context.phase === 'enter') return { delay: context.datumIndex * 35 };
            if (context.datum?.status === 'forecast') return { transition: { type: 'tween', duration: 240, easing: 'linear' } };
            return undefined;
          },
        }),
      ],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 130_000]), grid: true } },
    });
  };
  const options = () => ({
    definition: build(),
    renderer: motion({ transition: { type: 'spring', stiffness: 120, damping: 12 } }),
    height: stage.height,
    ariaLabel: 'Monthly revenue, May and June are forecast',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const next = (): void => {
    scale = scale === 1 ? 1.35 : 1;
    host.update(options());
  };
  if (stage.bar) button(stage.bar, 'change data', next);
  else stage.every(2200, next);
  return () => stage.dispose();
};

export default mount;
