// Messy CSV that breaks naive readers (quoted commas, line breaks, quotes) parsed right
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csvEditor, csvView } from '../../shared/csv-view.ts';
import { flash, flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

interface Trap {
  name: string;
  text: string;
  /** The cell that would break a naive reader: row index and column name. */
  cell: [number, string];
  say: string;
}

const TRAPS: Trap[] = [
  {
    name: 'comma inside a value',
    text: 'name,address\nAda,"12 Mill Lane, Leeds"\nBruno,"3 Rue Neuve, Lyon"',
    cell: [0, 'address'],
    say: 'The comma inside quotes stays part of the address.',
  },
  {
    name: 'line break inside a value',
    text: 'product,note\nMug,"Blue\nhandle chipped"\nTeapot,ok',
    cell: [0, 'note'],
    say: 'The line break inside quotes stays in one cell (↵).',
  },
  {
    name: 'quotes inside a value',
    text: 'title,rating\n"The ""Big"" Day",4\n"Say ""hi""",5',
    cell: [0, 'title'],
    say: 'Doubled quotes "" turn back into one quote mark.',
  },
  {
    name: 'semicolons, not commas',
    text: 'city;price\nGraz;"4,50"\nCork;"3,20"',
    cell: [0, 'price'],
    say: 'Papa spots the ; separator, so "4,50" stays one value.',
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a trap, or edit the text to make your own.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'Table' });

  const parse = (text: string, trap?: Trap): string => {
    const result = Papa.parse<Record<string, unknown>>(text, { header: true, skipEmptyLines: true });
    const [row, col] = trap?.cell ?? [-1, ''];
    f.to.show(
      dataTable(result.data, {
        fields: result.meta.fields,
        cellClass: (_v, i, c) => (i === row && c === col ? 'pp-hit' : undefined),
      }),
    );
    const hit = f.to.body.querySelector('td.pp-hit');
    if (hit) flash(hit);
    if (trap) stage.say(trap.say, 'ok');
    else stage.say(`${result.data.length} rows, ${result.errors.length} errors, separator "${result.meta.delimiter}"`);
    return result.meta.delimiter;
  };

  if (stage.preview) {
    stage.cycle(TRAPS, 3200, (trap) => {
      const delimiter = parse(trap.text, trap);
      f.from.show(csvView(trap.text, { delimiter }));
    });
    return stage.dispose;
  }

  const editor = csvEditor(TRAPS[0]!.text, (text) => editor.paint({ delimiter: parse(text) }));
  f.from.show(editor.el);
  const show = (trap: Trap): void => {
    editor.set(trap.text);
    editor.paint({ delimiter: parse(trap.text, trap) });
  };
  select(stage.bar!, 'Trap', TRAPS.map((t) => [t, t.name] as const), show);
  show(TRAPS[0]!);
  return stage.dispose;
};

export default mount;
