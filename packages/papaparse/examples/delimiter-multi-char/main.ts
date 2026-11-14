// An address list separated by "::": delimiter can be several characters
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { textInput } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

// The values hold commas and semicolons, so neither could be the separator.
const TEXT = 'Ada::Leeds, UK::40\nBo::Lyon; FR::15\nCy::Graz, AT::22';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try "::" then "||" (and change the text to match), or an empty box to let Papa guess.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'Rows' });
  const out = output(stage, f.to);
  let delimiter = '';
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // A string of any length works. It just cannot be a line break, a quote or a BOM.
    const result = Papa.parse<string[]>(input.text, { delimiter });
    const d = result.meta.delimiter;
    f.via.textContent = delimiter ? `Papa.parse(text, { delimiter: '${delimiter}' })` : 'Papa.parse(text)';
    input.paint({ delimiter: delimiter || d });
    const width = result.data[0]?.length ?? 0;
    out.show(dataTable(result.data, { numbered: false, rowClass: (r) => ((r as string[]).length !== width ? 'pp-bad' : undefined) }));
    out.pill('delimiter used', d, delimiter ? 'ok' : 'warn');
    const good = delimiter && result.data.every((r) => r.length === 3);
    stage.say(good ? `Three clean columns: "${delimiter}" is one separator.` : `Guessed "${d}": the commas cut the addresses.`, good ? 'ok' : 'bad');
  };

  const set = (v: string): void => {
    delimiter = v;
    render();
  };
  // A card flips between guessing and "::"; the full view starts on "::" and has a box.
  stage.cycle(stage.preview ? ['', '::'] : ['::'], 2600, set);
  if (stage.bar) textInput(stage.bar, 'delimiter', '::', set, 6);
  return stage.dispose;
};

export default mount;
