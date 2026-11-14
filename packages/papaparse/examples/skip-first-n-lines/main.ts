// A bank statement with a title block: skipFirstNLines starts at the header
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const CARD = 'ACME BANK export\nAccount 1234\ndate,amount\n12 Nov,-3.40';
const FULL = 'ACME BANK\nPrinted 14 Nov 2026\nAccount 1234\ndate,description,amount\n12 Nov,Coffee,-3.40\n13 Nov,Salary,2100.00';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide until the real header line ("date,…") is the first one read.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let skip = 0;
  const input = csvInput(stage, f.from, stage.preview ? CARD : FULL, () => render());

  const render = (): void => {
    // The first n lines are thrown away before anything else happens.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true, skipEmptyLines: true, skipFirstNLines: skip });
    f.via.textContent = skip ? `{ header: true, skipFirstNLines: ${skip} }` : 'Papa.parse(text, { header: true })';
    input.paint({ lineClass: (i) => (i < skip ? 'pp-strike' : i === skip ? 'pp-hit' : undefined) });
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, rowClass: () => (skip === 0 ? 'pp-bad' : undefined) }));
    const fields = (result.meta.fields ?? []).join(', ');
    out.pill('errors', result.errors.length, result.errors.length ? 'bad' : 'ok');
    stage.say(`Header is now: ${fields}`, fields.includes('date') ? 'ok' : 'bad');
  };

  stage.cycle(stage.preview ? [0, 2] : [0], 2600, (n) => {
    skip = n;
    render();
  });
  if (stage.bar) slider(stage.bar, 'skipFirstNLines', 0, 5, 1, 0, (v) => {
    skip = v;
    render();
  });
  return stage.dispose;
};

export default mount;
