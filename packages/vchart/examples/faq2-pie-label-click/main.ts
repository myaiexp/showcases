// FAQ: labels ignore events until label.interactive is true; then listen with { level: 'model', type: 'label' }
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const TYPES = ['oxygen', 'silicon', 'aluminum', 'iron', 'calcium'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(3);
  const rows = (): { type: string; value: number }[] =>
    TYPES.map((type, i) => ({ type, value: Math.round(60 / (i + 1) + rand() * 8) }));
  const out = ctx.preview ? null : readout(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'elements', values: rows() }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: 0.8,
    innerRadius: 0.5,
    padAngle: 0.6,
    label: { visible: true, interactive: true, style: { fontSize: 13 } },
    legends: { visible: !ctx.preview, orient: 'bottom' },
  });
  if (out) {
    out.textContent = 'Click a label.';
    // level 'model' + type 'label' targets the label component instead of the sectors.
    vchart.on('click', { level: 'model', type: 'label' }, (e) => {
      const d = e.datum as { type?: string; value?: number } | undefined;
      out.textContent = `label clicked: ${d?.type ?? '(no datum)'} ${d?.value ?? ''}`;
    });
  }
  let alive = true;
  const stop = every(1800, () => {
    if (alive) void vchart.updateData('elements', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
