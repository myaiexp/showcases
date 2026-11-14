// One parse result drawn as its three parts: data, errors and meta
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { errorList, marks, metaList, section } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A till list: Bo's line is missing the price, Cy's has a stray extra note.
const TEXT = 'name,qty,price\nAda,2,4.50\nBo,1\nCy,3,2.00,gift';
type Part = 'data' | 'errors' | 'meta';
const PARTS: Part[] = ['data', 'errors', 'meta'];
const SAY: Record<Part, string> = {
  data: 'data: every row, as the table you see.',
  errors: 'errors: rows 1 and 2 do not fit the header.',
  meta: 'meta: facts: delimiter, line break, columns.',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the text: all three parts of the result follow. Try deleting a comma.' });
  const f = flow(stage, { from: 'CSV text', via: 'result = Papa.parse(text, { header: true })', to: 'result', split: 0.34 });
  const out = output(stage, f.to);
  let only: Part | null = null; // a card shows one part at a time, the full view all three

  const render = (): void => {
    // The result object always has these three parts.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true });
    const m = marks(input.text, result, true);
    input.paint({ lineClass: m.lineClass });
    const card = stage.preview;
    const table = dataTable(result.data, { fields: result.meta.fields, maxRows: card ? 3 : 0, rowClass: m.rowClass });
    const errs = errorList(result.errors, { compact: card, type: !card });
    const meta = metaList(result.meta, card ? ['delimiter', 'linebreak', 'aborted', 'truncated', 'fields'] : undefined);
    if (only) {
      f.to.title.textContent = `result.${only}`;
      out.show({ data: table, errors: errs, meta }[only]);
      stage.say(SAY[only], only === 'errors' ? 'warn' : 'info');
    } else {
      out.show(section('result.data', table), section('result.errors', errs), section('result.meta', meta));
      stage.say(`${result.data.length} rows, ${result.errors.length} errors, delimiter "${result.meta.delimiter}"`);
    }
  };
  const input = csvInput(stage, f.from, TEXT, render);
  stage.cycle<Part | null>(stage.preview ? PARTS : [null], 2600, (p) => {
    only = p;
    render();
  });
  return stage.dispose;
};

export default mount;
