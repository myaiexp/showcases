// Stray spaces, lower-case codes and euro signs cleaned by transform
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'code,item,price\n  ab-12 ,Teapot ,€24\ncd-07,Mug,€9';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then add a row with odd spacing or a € sign.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let clean = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    const raw = Papa.parse<Record<string, string>>(input.text, { header: true, skipEmptyLines: true }).data;
    const result = Papa.parse<Record<string, string>>(input.text, {
      header: true,
      skipEmptyLines: true,
      // Called for every value with the value and its column (the header name here).
      transform: clean
        ? (value, column) => {
            if (column === 'code') return value.trim().toUpperCase();
            if (column === 'price') return value.replace('€', '').trim();
            return value.trim();
          }
        : undefined,
    });
    f.via.textContent = clean ? 'Papa.parse(text, { header: true, transform })' : 'Papa.parse(text, { header: true })';
    input.paint({});
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, cellClass: (v, i, c) => (clean && raw[i]?.[String(c)] !== v ? 'pp-hit' : undefined) }));
    const first = result.data[0];
    const code = JSON.stringify(first?.['code']);
    stage.say(clean ? `${JSON.stringify(raw[0]?.['code'])} → ${code}, ${JSON.stringify(raw[0]?.['price'])} → ${JSON.stringify(first?.['price'])}` : `As read: code ${code}, price ${JSON.stringify(first?.['price'])}`, clean ? 'ok' : 'warn');
  };

  toggle(stage, 'transform', (on) => {
    clean = on;
    render();
  });
  return stage.dispose;
};

export default mount;
