// An unclosed quote swallows every line after it into one cell
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { select } from '../../shared/controls.ts';
import { flow } from '../../shared/panes.ts';
import { errorList, marks } from '../../shared/result-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

interface Scene {
  text: string;
  say: string;
}
const HEAD = 'item,note';
const TAIL = 'Teapot,ok\nKettle,fine';
const BROKEN: Scene = { text: `${HEAD}\nMug,"chipped\n${TAIL}`, say: 'One missing quote: 3 rows became 1 cell.' };
const FIXED: Scene = { text: `${HEAD}\nMug,"chipped"\n${TAIL}`, say: 'Quote closed: all 3 rows are back.' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove the closing quote after "chipped" and watch the rows come back.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows', split: 0.4 });
  const out = output(stage, f.to);
  let say = '';

  const render = (): void => {
    // A quote opens a cell that only a closing quote can end, line breaks and all.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true });
    const m = marks(input.text, result, true);
    input.paint({ lineClass: m.lineClass });
    const missing = result.errors.some((e) => e.code === 'MissingQuotes');
    out.show(
      dataTable(result.data, { fields: result.meta.fields, maxRows: 3, rowClass: m.rowClass, cellClass: (_v, i, c) => (m.rows.has(i) && c === 'note' ? 'pp-bad' : undefined) }),
      errorList(result.errors, { compact: stage.preview, max: stage.preview ? 1 : 0, type: !stage.preview }),
    );
    out.pill('rows', result.data.length, missing ? 'bad' : 'ok');
    stage.say(say || (missing ? 'A quote is never closed: the rest is one cell.' : 'Every quote is closed.'), missing ? 'bad' : 'ok');
  };
  const input = csvInput(stage, f.from, BROKEN.text, () => {
    say = '';
    render();
  });
  const show = (s: Scene): void => {
    input.set(s.text);
    say = s.say;
    render();
  };
  stage.cycle(stage.preview ? [BROKEN, FIXED] : [BROKEN], 3200, show);
  if (stage.bar) select(stage.bar, 'Text', [[BROKEN, 'quote left open'], [FIXED, 'quote closed']], show);
  return stage.dispose;
};

export default mount;
