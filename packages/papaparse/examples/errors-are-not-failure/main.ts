// A messy upload still yields every row, with a warning list beside it
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { errorList, marks } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A sign-up sheet exported by hand: Bo forgot the city, Cy added a note.
const TEXT = 'name,age,city\nAda,31,Oslo\nBo,28\nCy,45,Lyon,vip';
type Step = 'rows' | 'warnings' | 'clean';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Papa never throws on a messy file. Tick the box to keep only the rows without a warning.' });
  const f = flow(stage, { from: 'Upload', via: 'Papa.parse(text, { header: true })', to: 'result', split: 0.4 });
  const out = output(stage, f.to);
  let step: Step = 'rows';

  const render = (): void => {
    // Errors are warnings: `data` still holds every row Papa could read.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true });
    const m = marks(input.text, result, true);
    const clean = step === 'clean' || (!stage.preview && keepClean.checked);
    const rows = clean ? result.data.filter((_r, i) => !m.rows.has(i)) : result.data;
    input.paint({ lineClass: step === 'rows' && stage.preview ? undefined : m.lineClass });
    f.to.title.textContent = `result.data (${rows.length} rows)`;
    const list = errorList(result.errors, { compact: stage.preview, max: stage.preview ? 2 : 0, type: !stage.preview });
    out.show(
      dataTable(rows, { fields: result.meta.fields, maxRows: stage.preview ? 4 : 0, rowClass: step === 'rows' && stage.preview ? undefined : m.rowClass }),
      ...(step === 'rows' && stage.preview ? [] : [list]),
    );
    out.pill('rows', rows.length, 'ok');
    out.pill('warnings', result.errors.length, result.errors.length ? 'warn' : 'ok');
    if (stage.preview) {
      const say = {
        rows: [`Parsed: all ${result.data.length} rows came out.`, 'ok'],
        warnings: [`...plus ${result.errors.length} warnings about two rows.`, 'warn'],
        clean: [`Your call: keep the ${rows.length} clean rows only.`, 'info'],
      } as const;
      const [text, tone] = say[step];
      stage.say(text, tone);
    } else {
      stage.say(`${result.data.length} rows parsed, ${result.errors.length} warnings: nothing failed.`, result.errors.length ? 'warn' : 'ok');
    }
  };
  const input = csvInput(stage, f.from, TEXT, render);
  const keepClean = stage.bar ? checkbox(stage.bar, 'keep only rows without warnings', false, render) : ({ checked: false } as HTMLInputElement);
  stage.cycle<Step>(stage.preview ? ['rows', 'warnings', 'clean'] : ['warnings'], 2400, (s) => {
    step = s;
    render();
  });
  return stage.dispose;
};

export default mount;
