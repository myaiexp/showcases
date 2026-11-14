// A sensor log: date-times become Dates, blanks null, date-only stays text
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle, typeSummary } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable, typeLegend } from '../../shared/table.ts';

const TEXT = 'time,ok,reading\n2026-11-14T09:30:00Z,true,21.5\n2026-11-14,TRUE,\n2026-11-14T09:45Z,false,n/a';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then type your own timestamps. Drop the T part and watch it fall back to text.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let typed = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // With dynamicTyping the source also converts ISO date-times (new Date) and "" to null.
    const result = Papa.parse<Record<string, unknown>>(input.text, { header: true, skipEmptyLines: true, dynamicTyping: typed });
    f.via.textContent = typed ? 'Papa.parse(text, { dynamicTyping: true })' : 'Papa.parse(text, { header: true })';
    input.paint({});
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false }), ...(stage.preview ? [] : [typeLegend(['str', 'num', 'bool', 'empty', 'null'])]));
    out.pill('cells', typeSummary(result.data));
    stage.say(typed ? 'Dates, booleans, numbers; the blank is null.' : 'All text, even the blank (empty).', typed ? 'ok' : 'warn');
  };

  toggle(stage, 'dynamicTyping', (on) => {
    typed = on;
    render();
  });
  return stage.dispose;
};

export default mount;
