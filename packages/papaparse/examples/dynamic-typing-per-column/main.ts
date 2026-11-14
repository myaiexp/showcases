// Postcodes with leading zeros: dynamicTyping per column keeps "00100" as it is
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable, typeLegend } from '../../shared/table.ts';

const TEXT = 'city,zip,price\nHelsinki,00100,4.5\nEspoo,02100,3.2';
type Mode = 'none' | 'all' | 'price';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the setting. Edit a zip to see when its zeros survive.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let mode: Mode = 'none';
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    const result = Papa.parse<Record<string, unknown>>(input.text, {
      header: true,
      skipEmptyLines: true,
      // false: all text. true: every column. An object: only the columns named, by header.
      dynamicTyping: mode === 'all' ? true : mode === 'price' ? { price: true } : false,
    });
    f.via.textContent = { none: 'Papa.parse(text, { header: true })', all: '{ dynamicTyping: true }', price: '{ dynamicTyping: { price: true } }' }[mode];
    input.paint({});
    const lost = (v: unknown, col: string | number): boolean => col === 'zip' && typeof v === 'number';
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, cellClass: (v, _i, col) => (lost(v, col) ? 'pp-bad' : undefined) }), ...(stage.preview ? [] : [typeLegend(['str', 'num'])]));
    const damaged = result.data.some((r) => lost(r['zip'], 'zip'));
    out.pill('zip is a', typeof result.data[0]?.['zip'], damaged ? 'bad' : 'ok');
    const says = {
      none: ['Nothing typed: the price is text, too.', 'warn'],
      all: ['Everything typed: 00100 became 100!', 'bad'],
      price: ['Only price typed: the zip keeps its zeros.', 'ok'],
    } as const;
    const [text, tone] = says[mode];
    stage.say(text, tone);
  };

  choose(
    stage,
    'dynamicTyping',
    [
      ['none', 'off'],
      ['all', 'true (every column)'],
      ['price', '{ price: true }'],
    ] as const,
    (m) => {
      mode = m;
      render();
    },
    2400,
  );
  return stage.dispose;
};

export default mount;
