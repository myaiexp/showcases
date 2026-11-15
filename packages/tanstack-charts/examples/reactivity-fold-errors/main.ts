// fold throws synchronously with a "fold:" message for bad options; valid options give rows
import { fold } from '@tanstack/charts/transform/fold';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { services } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each case calls fold once and prints what happened.' });
  const show = readoutPanel(stage);

  const cases: readonly (readonly [string, () => unknown])[] = [
    ['duplicate fields', () => fold(services, { fields: ['latency', 'latency'] as const })],
    ['same key and value name', () => fold(services, { fields: ['latency', 'errors'] as const, as: { key: 'm', value: 'm' } })],
    ['reserved output name', () => fold(services, { fields: ['latency', 'errors'] as const, as: { key: 'source', value: 'v' } })],
    ['valid options', () => fold(services, { fields: ['latency', 'errors'] as const, as: { key: 'metric', value: 'amount' } })],
  ];
  const run = ([name, call]: readonly [string, () => unknown]): void => {
    try {
      const rows = call() as object[];
      show(`${name}: ${rows.length} rows\n${tableText(rows, ['service', 'metric', 'amount'], 4)}`);
      stage.say(`${name}: fold returned ${rows.length} rows`);
    } catch (err) {
      show(`${name}:\nthrown ${(err as Error).message}`);
      stage.say(`${name}: ${(err as Error).message}`);
    }
  };
  if (stage.bar) for (const c of cases) button(stage.bar, c[0], () => run(c));
  stage.cycle(cases, 1800, run);
  return () => stage.dispose();
};

export default mount;
