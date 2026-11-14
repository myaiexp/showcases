// Papa.BAD_DELIMITERS: ask for a banned delimiter and Papa quietly uses a comma
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { select } from '../../shared/controls.ts';
import { csvView, visible } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A scores sheet that really uses semicolons.
const TEXT = 'name;score\nAda;9\nBo;7';
// What the reader asks for, and how it is written in code.
const ASKS: readonly (readonly [string, string])[] = [
  [';', "';'"],
  ['"', `'"'`],
  ['\n', "'\\n'"],
  ['\r', "'\\r'"],
  [Papa.BYTE_ORDER_MARK, 'Papa.BYTE_ORDER_MARK'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a delimiter. Papa.BAD_DELIMITERS are refused, whatever the text looks like.' });
  const f = flow(stage, { from: 'CSV text (separated by ;)', via: '', to: 'rows', split: 0.36 });
  const out = output(stage, f.to);

  const render = (asked: string): void => {
    const code = ASKS.find((a) => a[0] === asked)![1];
    f.via.textContent = `Papa.parse(text, { delimiter: ${code} })`;
    // A banned delimiter is not an error: Papa ignores it and uses a comma.
    const banned = Papa.BAD_DELIMITERS.includes(asked);
    const result = Papa.parse<string[]>(input.text, { delimiter: asked });
    input.paint({ delimiter: result.meta.delimiter }); // the separators Papa actually saw
    // Papa.unparse has the same guard.
    const written = Papa.unparse([['Ada', 9]], { delimiter: asked });
    out.show(
      dataTable(result.data, { numbered: false, maxRows: 3 }),
      ...(stage.preview ? [] : [csvView(`unparse([['Ada', 9]], { delimiter: ${code} })  →  ${visible(written)}`)]),
    );
    out.pill('asked for', asked, banned ? 'bad' : 'ok');
    out.pill('used', result.meta.delimiter, banned ? 'warn' : 'ok');
    out.pill('errors', result.errors.length);
    stage.say(
      banned ? 'Banned: Papa used "," and got 1 column.' : 'Allowed: ; splits the text into 2 columns.',
      banned ? 'bad' : 'ok',
    );
  };
  const input = csvInput(stage, f.from, TEXT, () => render(current));
  let current = ASKS[0]![0];
  const show = (a: string): void => {
    current = a;
    render(a);
  };
  stage.cycle(stage.preview ? [';', '"', '\n'] : [';'], 2600, show);
  if (stage.bar) select(stage.bar, 'delimiter', ASKS.map(([v, code]) => [v, code] as const), show);
  return stage.dispose;
};

export default mount;
