// A price list with decimal commas: naming the separator beats the guess
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// Semicolons between columns, commas as decimal points: two columns, no header.
const TEXT = 'Tea;4,50\nMug;3,20\nHoney;7,90';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then edit the text: add a third column with ; between values.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'Rows' });
  const out = output(stage, f.to);
  let named = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // Leave delimiter out and Papa guesses; give it one and the guess is skipped.
    const result = Papa.parse<string[]>(input.text, named ? { delimiter: ';' } : {});
    const d = result.meta.delimiter;
    f.via.textContent = named ? "Papa.parse(text, { delimiter: ';' })" : 'Papa.parse(text)';
    input.paint({ delimiter: d });
    out.show(
      dataTable(result.data, {
        numbered: false,
        cellClass: (v) => (String(v).includes(';') ? 'pp-bad' : named ? 'pp-ok' : undefined),
      }),
    );
    out.pill('delimiter used', d, d === ';' ? 'ok' : 'warn');
    stage.say(named ? 'Named ";": item and price, as meant.' : `Guessed "${d}": prices cut, items glued.`, named ? 'ok' : 'bad');
  };

  toggle(stage, 'delimiter: ";"', (on) => {
    named = on;
    render();
  });
  return stage.dispose;
};

export default mount;
