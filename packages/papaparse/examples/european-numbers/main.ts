// Prices written 1.234,56: transform rewrites them before dynamicTyping
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable, typeLegend } from '../../shared/table.ts';

const TEXT = 'item;price\nCamera;1.234,56\nLens;899,90\nBag;45,00';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then try a price of your own, like 12.345,67.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { dynamicTyping: true })', to: 'rows' });
  const out = output(stage, f.to);
  let swap = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    const result = Papa.parse<Record<string, unknown>>(input.text, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      dynamicTyping: true,
      // Runs on every value BEFORE dynamicTyping: 1.234,56 becomes 1234.56 first.
      transform: swap ? (value) => (/^-?[\d.]*\d,\d+$/.test(value) ? value.replace(/\./g, '').replace(',', '.') : value) : undefined,
    });
    f.via.textContent = swap ? '{ transform: swap, dynamicTyping: true }' : 'Papa.parse(text, { dynamicTyping: true })';
    input.paint({ delimiter: ';' });
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, cellClass: (v, _i, c) => (c === 'price' ? (typeof v === 'number' ? 'pp-ok' : 'pp-bad') : undefined) }), ...(stage.preview ? [] : [typeLegend(['str', 'num'])]));
    const nums = result.data.filter((r) => typeof r['price'] === 'number').length;
    out.pill('prices as numbers', `${nums} of ${result.data.length}`, nums === result.data.length ? 'ok' : 'bad');
    stage.say(swap ? 'Swapped first: every price is a real number.' : '1.234,56 is not a number to JS: left as text.', swap ? 'ok' : 'bad');
  };

  toggle(stage, 'transform: swap , and .', (on) => {
    swap = on;
    render();
  });
  return stage.dispose;
};

export default mount;
