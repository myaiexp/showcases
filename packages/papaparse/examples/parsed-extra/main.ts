// A row longer than the header: the extra values land in __parsed_extra
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { errorList, marks } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A team list with two columns, but Bruno's line carries two more values.
const TEXT = 'name,team\nAda,Red\nBruno,Blue,captain,27\nChen,Red';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add more commas to a line: every value past the header goes into the same list.' });
  const f = flow(stage, { from: 'CSV text (name, team)', via: 'Papa.parse(text, { header: true })', to: 'rows', split: 0.38 });
  const out = output(stage, f.to);
  let header = true;

  const render = (): void => {
    // With a header, a value past the last column name has nowhere to go: it is kept in
    // `__parsed_extra` (a list) and a TooManyFields error is added.
    const result = Papa.parse<Record<string, unknown>>(input.text, { header });
    const m = marks(input.text, result, header);
    f.via.textContent = header ? 'Papa.parse(text, { header: true })' : 'Papa.parse(text, { header: false })';
    f.to.title.textContent = header ? 'rows (objects)' : 'rows (plain lists)';
    input.paint({ lineClass: m.lineClass });
    out.show(
      dataTable(result.data, {
        fields: result.meta.fields,
        rowClass: m.rowClass,
        cellClass: (_v, _i, col) => (col === '__parsed_extra' ? 'pp-hit' : undefined),
      }),
      errorList(result.errors, { compact: stage.preview, max: stage.preview ? 1 : 0, type: !stage.preview, none: 'errors: none: no header, no column to overflow' }),
    );
    out.pill('errors', result.errors.length, result.errors.length ? 'bad' : 'ok');
    stage.say(
      header ? 'Bruno\'s 2 extra values sit in __parsed_extra.' : 'No header: the row is just longer. No error.',
      header ? 'warn' : 'info',
    );
  };
  const input = csvInput(stage, f.from, TEXT, render);
  toggle(stage, 'header: true', (on) => {
    header = on;
    render();
  }, { initial: true, ms: 3000 });
  return stage.dispose;
};

export default mount;
