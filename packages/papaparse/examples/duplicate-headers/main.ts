// A quiz sheet with three columns called "score": none may be lost
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'name,score,score,score\nAda,9,7,8\nBo,5,6,9';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch between the two readings, and repeat other names in the first line.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let renamed = true;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // Repeated names are renamed with _1, _2 ... and listed in meta.renamedHeaders.
    const result = Papa.parse<Record<string, string>>(input.text, { header: true, skipEmptyLines: true });
    const changed = result.meta.renamedHeaders ?? {};
    input.paint({ lineClass: (i) => (i === 0 ? 'pp-hit' : undefined) });
    if (renamed) {
      out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, cellClass: (_v, _i, col) => (String(col) in changed ? 'pp-ok' : undefined) }));
      f.via.textContent = 'Papa.parse(text, { header: true })';
    } else {
      // What plain keys would give: the last "score" overwrites the others.
      const raw = Papa.parse<string[]>(input.text, { skipEmptyLines: true }).data;
      const head = raw[0] ?? [];
      const plain = raw.slice(1).map((row) => Object.fromEntries(head.map((h, i) => [h, row[i]])));
      out.show(dataTable(plain, { numbered: false, cellClass: (_v, _i, col) => (col === 'score' ? 'pp-bad' : undefined) }));
      f.via.textContent = '{ [name]: value } by hand';
    }
    const n = Object.keys(changed).length;
    out.pill('meta.renamedHeaders', JSON.stringify(changed), n ? 'ok' : undefined);
    stage.say(
      renamed ? (n ? `Papa renamed ${n}: ${Object.keys(changed).join(', ')}.` : 'No repeated names here.') : `Plain keys keep 1 score; ${n} are lost.`,
      renamed ? 'ok' : 'bad',
    );
  };

  choose(
    stage,
    'Reading',
    [
      [false, 'Plain keys (by hand)'],
      [true, 'Papa.parse'],
    ] as const,
    (v) => {
      renamed = v;
      render();
    },
  );
  return stage.dispose;
};

export default mount;
