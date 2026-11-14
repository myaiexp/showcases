// A class list read by position (header: false) or by name (true)
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'name,city,age\nAda,Leeds,41\nBo,Lyon,35';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box; the first row of data changes shape. Rename a column and watch the keys follow.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'rows' });
  const out = output(stage, f.to);
  let named = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // header: true turns the first line into field names and every other line into an object.
    const result = Papa.parse<unknown>(input.text, { header: named, skipEmptyLines: true });
    const second = result.data[named ? 0 : 1] as Record<string, string> | string[] | undefined;
    f.via.textContent = named ? 'Papa.parse(text, { header: true })' : 'Papa.parse(text)';
    input.paint({ lineClass: (i) => (i === 0 ? (named ? 'pp-hit' : 'pp-dim') : undefined) });
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false, rowClass: (_r, i) => (!named && i === 0 ? 'pp-dim' : undefined) }));
    const code = Array.isArray(second) ? `rows[1][1] = ${JSON.stringify(second[1])}` : `rows[0].city = ${JSON.stringify(second?.['city'])}`;
    out.pill('the same city', code);
    out.pill('first row looks like', JSON.stringify(result.data[0]));
    stage.say(named ? `By name: ${code}` : `By position: ${code}`, 'ok');
  };

  toggle(stage, 'header: true', (on) => {
    named = on;
    render();
  });
  return stage.dispose;
};

export default mount;
