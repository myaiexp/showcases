// delimiter picks the separator: ;, tab, | or several characters
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select, textInput } from '../../shared/controls.ts';
import { csvView, visible } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// A price list written the European way, with decimal commas.
const ROWS: unknown[][] = [
  ['Item', 'Price'],
  ['Tea', '4,50'],
  ['Honey', '6,20'],
];

const CHOICES: { delimiter: string; say: string }[] = [
  { delimiter: ',', say: 'The default comma: the prices need quotes.' },
  { delimiter: ';', say: 'Semicolon: the prices no longer need quotes.' },
  { delimiter: '\t', say: 'Tab (⇥): what spreadsheets paste as.' },
  { delimiter: '|', say: 'Pipe: easy to spot, rare inside text.' },
  { delimiter: '::', say: 'Two characters work as a separator too.' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a delimiter, or type your own (not a quote mark or a line break: Papa ignores those).' });
  const f = flow(stage, { from: 'Price list', via: 'Papa.unparse(rows, { delimiter })', to: 'CSV text' });
  f.from.show(dataTable(ROWS, { numbered: false }));

  const unparse = (delimiter: string, say?: string): void => {
    // Any string, several characters allowed, as long as it is not in Papa.BAD_DELIMITERS.
    const csv = Papa.unparse(ROWS, { delimiter });
    f.to.show(csvView(csv, { delimiter }));
    const ignored = Papa.BAD_DELIMITERS.some((b) => delimiter.includes(b)) || delimiter === '';
    if (ignored) stage.say('Papa ignores that one and falls back to a comma.', 'warn');
    else stage.say(say ?? `delimiter: ${visible(delimiter)}`, 'ok');
  };

  if (stage.preview) {
    stage.cycle(CHOICES, 2400, (c) => {
      unparse(c.delimiter, c.say);
      revealRows(f.to.body);
    });
  } else {
    const typed = textInput(stage.bar!, 'or type', ';', (v) => unparse(v), 5);
    select(stage.bar!, 'delimiter', CHOICES.map((c) => [c, visible(c.delimiter)] as const), (c) => {
      typed.value = c.delimiter;
      unparse(c.delimiter, c.say);
    }, CHOICES[1]);
    unparse(';', CHOICES[1]!.say);
  }
  return stage.dispose;
};

export default mount;
