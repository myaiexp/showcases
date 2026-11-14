// A one-column list has no delimiter to find: Papa says so and falls back to a comma
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { select } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { errorList } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

interface Scene {
  text: string;
  say: string;
}
const ONE: Scene = { text: 'Ada\nBruno\nChen', say: 'One column: nothing to detect. Harmless.' };
const TWO: Scene = { text: 'name;city\nAda;Oslo\nBruno;Lyon', say: 'Two columns: Papa finds the ; at once.' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a ; or a tab into a line: once there are columns, the warning goes away.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'rows', split: 0.4 });
  const out = output(stage, f.to);
  let say = '';

  const render = (): void => {
    // No `delimiter` given: Papa guesses, and says so when it cannot.
    const result = Papa.parse<string[]>(input.text, { skipEmptyLines: true });
    const lost = result.errors.find((e) => e.code === 'UndetectableDelimiter');
    input.paint({ delimiter: lost ? '' : result.meta.delimiter });
    out.show(
      dataTable(result.data, { maxRows: 3, numbered: false }),
      errorList(result.errors, { max: 2, none: 'errors: none: delimiter found' }),
    );
    out.pill('delimiter used', result.meta.delimiter, lost ? 'warn' : 'ok');
    stage.say(say || (lost ? 'No delimiter found: used the default, a comma.' : `Delimiter found: "${result.meta.delimiter}".`), lost ? 'warn' : 'ok');
  };
  const input = csvInput(stage, f.from, ONE.text, () => {
    say = '';
    render();
  });
  const show = (s: Scene): void => {
    input.set(s.text);
    say = s.say;
    render();
  };
  stage.cycle(stage.preview ? [ONE, TWO] : [ONE], 3200, show);
  if (stage.bar) select(stage.bar, 'Text', [[ONE, 'one column'], [TWO, 'two columns']], show);
  return stage.dispose;
};

export default mount;
