// meta.fields lists the column names, which builds a column picker for the table
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import './style.css';

const TEXT = 'item,price,qty,shelf\nTea,4.50,2,A1\nHoney,6.20,1,B3\nMug,8.00,3,C2';
const CARD_PICKS: string[][] = [['item', 'price'], ['item', 'shelf'], ['price', 'qty', 'shelf']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the columns you want. Rename or add a column in the text: the picker grows with it.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true }).meta.fields', to: 'only the ticked columns', split: 0.4 });
  const out = output(stage, f.to);
  const picker = document.createElement('div');
  picker.className = 'picker';
  if (stage.bar) stage.bar.append(picker);
  else f.to.body.before(picker);
  const ticked = new Set<string>();
  const known = new Set<string>(); // names seen before: a new column starts ticked in the full view
  let fields: string[] = [];

  const render = (): void => {
    const result = Papa.parse<Record<string, string>>(input.text, { header: true, skipEmptyLines: true });
    // meta.fields is the list of column names Papa read from the header row.
    const all = result.meta.fields ?? [];
    if (all.join() !== fields.join()) {
      fields = all;
      picker.replaceChildren();
      for (const name of all) {
        if (stage.preview) {
          const chip = document.createElement('span');
          chip.className = 'chip';
          chip.dataset['name'] = name;
          chip.textContent = name;
          picker.append(chip);
        } else {
          if (!known.has(name)) ticked.add(name);
          checkbox(picker, name, ticked.has(name), (on) => {
            if (on) ticked.add(name);
            else ticked.delete(name);
            render();
          });
        }
      }
    }
    all.forEach((n) => known.add(n));
    for (const chip of picker.querySelectorAll<HTMLElement>('.chip')) chip.classList.toggle('on', ticked.has(chip.dataset['name']!));
    const shown = all.filter((n) => ticked.has(n));
    out.show(shown.length ? dataTable(result.data, { fields: shown, numbered: false, maxRows: 3 }) : dataTable([], { empty: 'tick a column to see it' }));
    stage.say(`Showing ${shown.length} of ${all.length} columns.`, shown.length ? 'ok' : 'warn');
  };
  const input = csvInput(stage, f.from, TEXT, render);
  stage.cycle(stage.preview ? CARD_PICKS : [[]], 2600, (pick) => {
    if (stage.preview) {
      ticked.clear();
      pick.forEach((n) => ticked.add(n));
    }
    render();
  });
  stage.onDispose(() => picker.remove());
  return stage.dispose;
};

export default mount;
