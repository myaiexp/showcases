// Adding up a quantity column: text glues the digits together, numbers add
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { countTypes, csvInput, output, toggle, typeSummary } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable, typeLegend } from '../../shared/table.ts';

const TEXT = 'item,qty,paid\nTea,4,true\nMug,12,false\nHoney,3,true';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then change a quantity. Type "ten" in one and see it stay text.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text, { header: true })', to: 'rows' });
  const out = output(stage, f.to);
  let typed = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // dynamicTyping: numbers become numbers and true/false become booleans.
    const result = Papa.parse<Record<string, unknown>>(input.text, { header: true, skipEmptyLines: true, dynamicTyping: typed });
    f.via.textContent = typed ? 'Papa.parse(text, { dynamicTyping: true })' : 'Papa.parse(text, { header: true })';
    input.paint({});
    out.show(dataTable(result.data, { fields: result.meta.fields, numbered: false }), ...(stage.preview ? [] : [typeLegend(['str', 'num', 'bool'])]));
    // The sum a program would compute: 0 + "4" + "12" + ... is text when the values are text.
    const total = result.data.reduce<unknown>((sum, row) => (sum as number) + (row['qty'] as number), 0);
    out.pill('qty added up', JSON.stringify(total), typeof total === 'number' ? 'ok' : 'bad');
    out.pill('cells', typeSummary(result.data));
    const n = countTypes(result.data).number ?? 0;
    stage.say(typeof total === 'number' ? `qty added up: ${total}. ${n} numbers.` : `qty added up: ${JSON.stringify(total)}. Text glued.`, typeof total === 'number' ? 'ok' : 'bad');
  };

  toggle(stage, 'dynamicTyping', (on) => {
    typed = on;
    render();
  });
  return stage.dispose;
};

export default mount;
