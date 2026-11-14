// A class list where some rows have too few cells and some too many
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { errorList, marks } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

interface Scene {
  text: string;
  say: string;
}
const FEW: Scene = { text: 'student,grade,room\nAda,A,12\nBruno,B\nDalia,C,9', say: 'Bruno has 2 cells, the header 3: TooFewFields.' };
const MANY: Scene = { text: 'student,grade,room\nAda,A,12\nChen,A,14,late\nDalia,C,9', say: '"late" has no column: TooManyFields.' };
const BOTH: Scene = { text: 'student,grade,room\nAda,A,12\nBruno,B\nChen,A,14,late\nDalia,C,9', say: 'Two rows do not fit the 3 columns.' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Delete a comma or add one: the row turns red and the error names the row.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows', split: 0.38 });
  const out = output(stage, f.to);
  let say = '';

  const render = (): void => {
    // The first line decides how many cells every row should have.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true });
    const m = marks(input.text, result, true);
    input.paint({ lineClass: m.lineClass });
    out.show(
      dataTable(result.data, { fields: result.meta.fields, rowClass: m.rowClass, maxRows: stage.preview ? 3 : 0 }),
      errorList(result.errors, { compact: stage.preview, max: stage.preview ? 1 : 0, type: true }),
    );
    out.pill('columns expected', result.meta.fields?.length ?? 0);
    out.pill('errors', result.errors.length, result.errors.length ? 'bad' : 'ok');
    const text = say || (result.errors.length ? `${result.errors.length} rows do not fit the header.` : 'Every row fits the header.');
    stage.say(text, result.errors.length ? 'warn' : 'ok');
  };
  const input = csvInput(stage, f.from, BOTH.text, () => {
    say = ''; // the reader's own text gets the generic caption
    render();
  });
  const show = (s: Scene): void => {
    input.set(s.text);
    say = s.say;
    render();
  };
  stage.cycle(stage.preview ? [FEW, MANY] : [BOTH], 3000, show);
  if (stage.bar) select(stage.bar, 'Example', [[BOTH, 'both kinds'], [FEW, 'too few'], [MANY, 'too many']], show);
  return stage.dispose;
};

export default mount;
