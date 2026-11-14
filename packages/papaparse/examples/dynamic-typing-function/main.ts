// Type every column except order and phone numbers, chosen by a function
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable, typeLegend } from '../../shared/table.ts';

const TEXT = 'order,phone,qty,price\n10042,0401234567,2,4.5\n10043,0507654321,1,12';
const COLUMNS = ['order', 'phone', 'qty', 'price'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch to the function, then tick or untick the columns to keep as text.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let useFunction = false;
  const keepText = new Set(['order', 'phone']);
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    const result = Papa.parse<Record<string, unknown>>(input.text, {
      header: true,
      skipEmptyLines: true,
      // A function is asked once per column (by header name here) and answers true or false.
      dynamicTyping: useFunction ? (column) => !keepText.has(String(column)) : true,
    });
    f.via.textContent = useFunction ? '{ dynamicTyping: (column) => … }' : '{ dynamicTyping: true }';
    input.paint({});
    const broken = (v: unknown, col: string | number): boolean => keepText.has(String(col)) && typeof v === 'number';
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, cellClass: (v, _i, c) => (broken(v, c) ? 'pp-bad' : keepText.has(String(c)) ? 'pp-ok' : undefined) }), ...(stage.preview ? [] : [typeLegend(['str', 'num'])]));
    const lost = result.data.some((r) => Object.entries(r).some(([c, v]) => broken(v, c)));
    out.pill('phone is a', typeof result.data[0]?.['phone'], lost ? 'bad' : 'ok');
    stage.say(useFunction ? 'The function spared order and phone.' : 'Everything typed: the phone lost its 0.', useFunction ? 'ok' : 'bad');
  };

  choose(
    stage,
    'dynamicTyping',
    [
      [false, 'true (every column)'],
      [true, 'function'],
    ] as const,
    (v) => {
      useFunction = v;
      render();
    },
  );
  if (stage.bar) {
    for (const c of COLUMNS) {
      checkbox(stage.bar, `keep ${c} as text`, keepText.has(c), (on) => {
        if (on) keepText.add(c);
        else keepText.delete(c);
        render();
      });
    }
  }
  return stage.dispose;
};

export default mount;
