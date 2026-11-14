// The same data separated by commas, tabs, pipes or semicolons: Papa works out which
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvEditor, csvView, visible } from '../../shared/csv-view.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { bigValue } from '../../shared/widgets.ts';

const ROWS = [
  ['town', 'people', 'river'],
  ['Turku', '200000', 'Aura'],
  ['Graz', '290000', 'Mur'],
];
const NAMES: Record<string, string> = { ',': 'comma', '\t': 'tab', '|': 'pipe', ';': 'semicolon', [Papa.RECORD_SEP]: 'record separator' };
const SEPARATORS = [',', '\t', '|', ';', Papa.RECORD_SEP];
const texts = SEPARATORS.map((sep) => ROWS.map((r) => r.join(sep)).join('\n'));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Swap the separators in the text for any of , tab | ; and watch the guess.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'Detected', split: 0.36 });
  const guess = bigValue(f.to.body, 'separator found in meta.delimiter');
  const out = document.createElement('div');
  f.to.body.append(out);

  const parse = (text: string): string => {
    // No delimiter option: Papa tries the common separators and keeps the one that fits.
    const result = Papa.parse<string[]>(text, { skipEmptyLines: true });
    const d = result.meta.delimiter;
    guess.set(`${visible(d)}  ${NAMES[d] ?? ''}`, result.errors.length ? 'warn' : 'ok');
    out.replaceChildren(dataTable(result.data, { numbered: false }));
    const undetectable = result.errors.find((e) => e.code === 'UndetectableDelimiter');
    stage.say(undetectable ? undetectable.message : `Split into ${result.data[0]?.length ?? 0} columns.`, undetectable ? 'warn' : 'ok');
    return d;
  };

  if (stage.preview) {
    stage.cycle(texts, 2400, (text) => {
      const d = parse(text);
      f.from.show(csvView(text, { delimiter: d }));
    });
  } else {
    const editor = csvEditor(texts[0]!, (text) => editor.paint({ delimiter: parse(text) }));
    f.from.show(editor.el);
    editor.paint({ delimiter: parse(texts[0]!) });
  }
  return stage.dispose;
};

export default mount;
