// The same CSV read by splitting on commas and line breaks, and by Papa.parse
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvEditor, csvView } from '../../shared/csv-view.ts';
import { flow, pane } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import './style.css';

const INPUTS = [
  'name,city,spent\nAda,"Leeds, UK",40\nBruno,"Lyon, FR",15',
  'item,note,qty\nMug,"chipped,\nreturned",1\nTeapot,fine,2',
  'quote,by\n"Hello, world",K&R\n"Yes, ""really""",Ada',
];

/** What a home-made reader does: cut at every line break, then at every comma. */
const naiveSplit = (text: string): string[][] => text.split('\n').map((line) => line.split(','));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the text. Red rows have the wrong number of cells.' });
  const f = flow(stage, { from: 'CSV text', via: 'two ways to read it', to: 'Result', dir: 'column', split: 0.38 });
  const left = pane("text.split(',')", 'pp-naive');
  const right = pane('Papa.parse(text)', 'pp-papa');
  const sides = document.createElement('div');
  sides.className = 'sides';
  sides.append(left.el, right.el);
  f.to.show(sides);

  const read = (text: string): void => {
    const naive = naiveSplit(text);
    const papa = Papa.parse<string[]>(text, { skipEmptyLines: true }).data;
    const width = papa[0]?.length ?? 0;
    const wrong = (row: unknown): string | undefined => ((row as string[]).length !== width ? 'pp-bad' : undefined);
    left.show(dataTable(naive, { rowClass: wrong, numbered: false }));
    right.show(dataTable(papa, { rowClass: wrong, numbered: false }));
    const broken = naive.filter((r) => r.length !== width).length + Math.abs(naive.length - papa.length);
    stage.say(
      broken ? `Splitting broke ${broken} rows; Papa kept ${papa.length} rows of ${width} cells.` : 'Both agree: no quotes here.',
      broken ? 'warn' : 'ok',
    );
  };

  if (stage.preview) {
    stage.cycle(INPUTS, 3400, (text) => {
      f.from.show(csvView(text));
      read(text);
    });
  } else {
    f.from.show(csvEditor(INPUTS[0]!, read).el);
    read(INPUTS[0]!);
  }
  return stage.dispose;
};

export default mount;
