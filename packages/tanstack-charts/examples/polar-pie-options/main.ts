// pie options: orderBy and order sort the angles, startAngle and endAngle limit the sweep, gapAngle spaces slices
import { defineChart, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { budget } from '../../shared/marks2-budget.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { order: 'source' as 'source' | 'descending' | 'ascending', gap: 0.04, sweep: 360 };

  const build = () => {
    const slices = pie(budget, {
      value: 'amount',
      ...(v.order === 'source' ? {} : { orderBy: 'amount', order: v.order }),
      startAngle: -((v.sweep / 2) * Math.PI) / 180,
      endAngle: ((v.sweep / 2) * Math.PI) / 180,
      gapAngle: v.gap,
    });
    return defineChart({
      svgAnimation: true,
      marks: [polar({ marks: [radialArc(slices, { key: 'name', color: 'name', innerRadius: ({ radius }) => radius * 0.35 })], scales: { angle: null, radius: null } })],
      scales: { x: null, y: null },
    });
  };

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Pie with ordering, sweep and gaps' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`order ${v.order}, gapAngle ${v.gap.toFixed(2)} rad, sweep ${v.sweep} degrees`);
  };
  refresh();
  if (stage.bar) {
    select(stage.bar, 'order', [['source', 'source order'], ['descending', 'largest first'], ['ascending', 'smallest first']] as const, (o) => { v.order = o; refresh(); });
    slider(stage.bar, 'gapAngle', 0, 0.3, 0.01, v.gap, (x) => { v.gap = x; refresh(); }, (x) => `${x.toFixed(2)} rad`);
    slider(stage.bar, 'sweep', 90, 360, 15, v.sweep, (x) => { v.sweep = x; refresh(); }, (x) => `${x} deg`);
  } else {
    stage.cycle([['source', 0.04, 360], ['descending', 0.1, 360], ['ascending', 0.02, 240], ['descending', 0.06, 180]] as const, 1700, ([o, g, s]) => { v.order = o; v.gap = g; v.sweep = s; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;
