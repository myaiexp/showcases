// Long order numbers: dynamicTyping keeps them text, Number() rounds
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'order,qty\n1234567890123456789,2\n9007199254740993,1\n42817,3';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the order numbers: up to 15 digits become numbers, longer ones stay text.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { dynamicTyping: true })', to: 'order column' });
  const out = output(stage, f.to);
  // A card shows one reading at a time; the full view shows both side by side.
  let view: 'papa' | 'number' | 'both' = stage.preview ? 'papa' : 'both';
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // Numbers beyond 2^53 or below -2^53 are not converted, to keep their digits.
    const result = Papa.parse<Record<string, unknown>>(input.text, { header: true, skipEmptyLines: true, dynamicTyping: true });
    input.paint({});
    const rows = result.data.map((r) => {
      const order = r['order'];
      const rounded = Number(order);
      return { 'Papa gives': order, 'Number() gives': rounded };
    });
    const shows = view === 'both' ? ['Papa gives', 'Number() gives'] : [view === 'papa' ? 'Papa gives' : 'Number() gives'];
    f.via.textContent = view === 'number' ? 'Number(order)' : 'Papa.parse(text, { dynamicTyping: true })';
    out.show(
      dataTable(rows, {
        fields: shows,
        numbered: false,
        cellClass: (v, i, col) => (col === 'Number() gives' && String(v) !== String(rows[i]!['Papa gives']) ? 'pp-bad' : undefined),
      }),
    );
    const kept = rows.filter((r) => typeof r['Papa gives'] === 'string').length;
    out.pill('kept as text', kept, 'ok');
    stage.say(view === 'number' ? 'Number() rounds them: the last digits are gone.' : `${kept} of ${rows.length} kept every digit (as text).`, view === 'number' ? 'bad' : 'ok');
  };

  stage.cycle(stage.preview ? (['papa', 'number'] as const) : (['both'] as const), 2800, (v) => {
    view = v;
    render();
  });
  return stage.dispose;
};

export default mount;
