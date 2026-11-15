// Lineage: normalized[i].source[0] is the folded row and its source[0] is the original record
import { barY, defineChart, normalize } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { services } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose a row: the highlighted bar is the one whose lineage is printed.' });

  const folded = fold(services, { fields: ['latency', 'errors'] as const, as: { key: 'metric', value: 'measurement' } });
  const normalized = normalize(folded, { by: 'metric', value: 'measurement', basis: 'max', as: 'share' });
  const show = readoutPanel(stage);

  const build = (index: number) =>
    defineChart({
      marks: [barY(normalized, { x: (d) => `${d.service} ${d.metric}`, y: 'share', color: (d) => (d === normalized[index] ? 'chosen' : 'other') })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2), axis: { tickLabels: { rotate: -35 } } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Share of the metric maximum' } },
      },
      color: { domain: ['other', 'chosen'], range: ['#64748b', '#fbbf24'] },
      margin: { bottom: 70 },
    });

  const states = normalized.map((d, i) => [i, `${d.service} ${d.metric}`] as const);
  lab(stage, {
    label: 'row',
    ariaLabel: 'Normalized metrics, one bar highlighted',
    states,
    build,
    after: (i) => {
      const row = normalized[i]!;
      const mid = row.source[0]!;
      const raw = mid.source[0]!;
      show(
        `normalized[${i}]        share = ${Math.round(row.share * 100) / 100}   sourceIndexes ${JSON.stringify(row.sourceIndexes)}\n` +
          `  .source[0]           folded: metric = ${mid.metric}, measurement = ${mid.measurement}   sourceIndexes ${JSON.stringify(mid.sourceIndexes)}\n` +
          `    .source[0]         original: ${JSON.stringify(raw)}`,
      );
      stage.say(`bar ${i}: normalized -> folded -> original row of ${raw.service}`);
    },
  });
  return () => stage.dispose();
};

export default mount;
