// fold output names: the default key/value pair against authored names
import { defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { services } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const show = readoutPanel(stage);

  const build = (named: boolean) => {
    const fields = ['latency', 'errors'] as const;
    const marks = named
      ? (() => {
          const rows = fold(services, { fields, as: { key: 'metric', value: 'amount' } });
          show(tableText(rows, ['service', 'metric', 'amount'], 4));
          return [lineY(rows, { x: 'metric', y: 'amount', color: 'service', points: true })];
        })()
      : (() => {
          const rows = fold(services, { fields });
          show(tableText(rows, ['service', 'key', 'value'], 4));
          return [lineY(rows, { x: 'key', y: 'value', color: 'service', points: true })];
        })();
    return defineChart({
      marks,
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.4) },
        y: { scale: scaleLinear().domain([0, 520]), grid: true },
      },
    });
  };
  const states = [[false, 'default: key / value'], [true, "as: { key: 'metric', value: 'amount' }"]] as const;
  lab(stage, { label: 'names', ariaLabel: 'Folded service metrics', states, build, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
