// Three exporters, three separators: a delimiter function decides
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { visible } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const SHOPS = [
  ['item,qty\nTea,12\nMug,8', 'Shop A: commas'],
  ['item;price\nTea;4,50\nMug;3,20', 'Shop B: semicolons'],
  ['item\tqty\nTea\t12\nMug\t8', 'Shop C: tabs'],
] as const;
const NAMES: Record<string, string> = { ',': 'comma', ';': 'semicolon', '\t': 'tab', '|': 'pipe' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a shop, then edit the first line: put a | in it and the rule follows.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { delimiter: rule })', to: 'Rows' });
  const out = output(stage, f.to);
  const input = csvInput(stage, f.from, SHOPS[0][0], () => render());

  const render = (): void => {
    const result = Papa.parse<Record<string, string>>(input.text, {
      header: true,
      // A function gets the whole text and returns the separator to use.
      delimiter: (text) => {
        const first = text.split(/\r?\n/)[0] ?? '';
        return [';', '\t', '|'].find((c) => first.includes(c)) ?? ',';
      },
    });
    const d = result.meta.delimiter;
    input.paint({ delimiter: d });
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false }));
    out.pill('rule returned', visible(d));
    stage.say(`The rule says ${NAMES[d] ?? d}: ${result.meta.fields?.length ?? 0} columns.`, 'ok');
  };

  choose(
    stage,
    'Exporter',
    SHOPS.map(([text, name]) => [text, name] as const),
    (text) => {
      input.set(text);
      render();
    },
    2800,
  );
  return stage.dispose;
};

export default mount;
