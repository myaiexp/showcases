// Quotes escaped as \" instead of "": escapeChar names the escape
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'quote,by\n"He said \\"hi\\"",Ada\n"Fine",Bo';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then add a quote of your own, escaped with a backslash.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'Rows' });
  const out = output(stage, f.to);
  let backslash = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // Default: a quote inside quotes is written twice. escapeChar changes that.
    const result = Papa.parse<string[]>(input.text, backslash ? { escapeChar: '\\' } : {});
    f.via.textContent = backslash ? "Papa.parse(text, { escapeChar: '\\\\' })" : 'Papa.parse(text)';
    input.paint(backslash ? { escapeChar: '\\' } : {});
    const bad = new Set(result.errors.map((e) => e.row));
    out.show(dataTable(result.data, { numbered: false, rowClass: (_r, i) => (bad.has(i) || (!backslash && i > 0) ? 'pp-bad' : undefined) }));
    out.pill('errors', result.errors.length, result.errors.length ? 'bad' : 'ok');
    stage.say(
      backslash ? 'The quote stays inside the value: 3 clean rows.' : `The \\" ended the value early: ${result.errors.length} errors.`,
      backslash ? 'ok' : 'bad',
    );
  };

  toggle(stage, "escapeChar: '\\\\'", (on) => {
    backslash = on;
    render();
  });
  return stage.dispose;
};

export default mount;
