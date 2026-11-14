// Product notes full of commas, tabs and quotes survive a round trip through invisible separators
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvView, visible } from '../../shared/csv-view.ts';
import { flash, flow, pane } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// Notes written by people: commas, a semicolon, a pipe, a tab and quote marks.
const ROWS = [
  ['Mug', 'blue, large'],
  ['Teapot', 'white; 1 L | steel'],
  ['Jug', 'says "hi"\tnew'],
];
const SEPARATORS: readonly (readonly [string, string])[] = [
  [',', 'comma ,'],
  [Papa.RECORD_SEP, 'Papa.RECORD_SEP ␞'],
  [Papa.UNIT_SEP, 'Papa.UNIT_SEP ␟'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick the separator: with a comma the notes need quotes; with the invisible ones they barely do.' });
  const f = flow(stage, { from: 'Rows: commas, tabs, | and quotes', via: '', to: 'CSV text', split: 0.4 });
  f.from.show(dataTable(ROWS, { numbered: false }));
  const back = pane('Papa.parse(text), no delimiter given');
  if (!stage.preview) stage.root.append(back.el);

  const show = (sep: string): void => {
    const name = SEPARATORS.find((s) => s[0] === sep)![1].split(' ').at(-2) ?? '';
    f.via.textContent = `${stage.preview ? '' : 'Papa.'}unparse(rows, { delimiter: ${name === 'comma' ? "','" : name} })`;
    // The invisible separators never appear in ordinary text, so no value needs quoting for them.
    const csv = Papa.unparse(ROWS, { delimiter: sep });
    f.to.show(csvView(csv, { delimiter: sep }));
    // Papa guesses RECORD_SEP and UNIT_SEP too, so the text parses back with no options.
    const parsed = Papa.parse<string[]>(csv);
    const same = JSON.stringify(parsed.data) === JSON.stringify(ROWS);
    back.show(dataTable(parsed.data, { numbered: false }));
    back.title.textContent = `Papa.parse(text): delimiter found ${visible(parsed.meta.delimiter)}, ${same ? 'same rows' : 'different rows'}`;
    flash(f.to.body, same ? 'var(--green)' : 'var(--red)');
    const quoted = (csv.match(/"/g) ?? []).length;
    stage.say(
      sep === ',' ? `Comma: ${quoted} quote marks needed, rows still match.` : `Parsed back: the same ${parsed.data.length} rows, ${quoted} quote marks.`,
      same ? 'ok' : 'bad',
    );
  };
  stage.cycle(stage.preview ? SEPARATORS.map((s) => s[0]) : [Papa.RECORD_SEP], 2800, show);
  if (stage.bar) select(stage.bar, 'delimiter', SEPARATORS, show, Papa.RECORD_SEP);
  return stage.dispose;
};

export default mount;
