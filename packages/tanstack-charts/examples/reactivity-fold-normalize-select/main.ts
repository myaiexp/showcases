// Composing fold, normalize and select: each step returns plain rows the next one reads
import { barX, defineChart, group, mountChart, normalize, select } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { services } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Latency and throughput end up on one 0 to 1 scale, so the bars compare across metrics.' });

  const fields = ['latency', 'throughput'] as const;
  const folded = fold(services, { fields, as: { key: 'metric', value: 'measurement' } });
  const normalized = normalize(folded, { by: 'metric', value: 'measurement', basis: 'extent', as: 'relativeMeasurement' });
  const firstService = select(normalized, { by: 'metric', select: 'first' });

  const definition = defineChart({
    marks: [barX(normalized, { x: 'relativeMeasurement', y: 'service', color: 'metric', layout: group() })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Relative to the metric extent' } },
      y: { scale: () => scaleBand<string>().padding(0.25) },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Normalized service metrics' }));

  const show = readoutPanel(stage);
  show(
    `fold -> ${folded.length} rows\n${tableText(folded, ['service', 'metric', 'measurement'], 3)}\n\n` +
      `normalize -> ${normalized.length} rows\n${tableText(normalized, ['service', 'metric', 'relativeMeasurement'], 3)}\n\n` +
      `select first per metric -> ${firstService.length} rows\n${tableText(firstService, ['service', 'metric', 'relativeMeasurement'], 3)}`,
  );
  stage.say('fold owns the wide-to-long step, normalize owns the comparison, select returns chosen rows unchanged.');
  return () => stage.dispose();
};

export default mount;
