// Single-quoted addresses: quoteChar tells Papa which character wraps a value
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvInput, output, toggle } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = "name,city\nAda,'Leeds, UK'\nBo,'Lyon, FR'";

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box, then edit: add a value like \'Graz, AT\' of your own.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(text)', to: 'Rows' });
  const out = output(stage, f.to);
  let single = false;
  const input = csvInput(stage, f.from, TEXT, () => render());

  const render = (): void => {
    // The default quote is ". Anything else has to be named.
    const result = Papa.parse<string[]>(input.text, single ? { quoteChar: "'" } : {});
    f.via.textContent = single ? `Papa.parse(text, { quoteChar: "'" })` : 'Papa.parse(text)';
    input.paint(single ? { quoteChar: "'" } : {});
    const width = result.data[0]?.length ?? 0;
    out.show(dataTable(result.data, { numbered: false, rowClass: (r) => ((r as string[]).length !== width ? 'pp-bad' : undefined) }));
    out.pill('columns in first row', width);
    stage.say(single ? 'Quotes recognised: 2 columns in every row.' : 'Quotes ignored: the comma cut each city in two.', single ? 'ok' : 'bad');
  };

  toggle(stage, `quoteChar: "'"`, (on) => {
    single = on;
    render();
  });
  return stage.dispose;
};

export default mount;
