// header: false leaves out the title line, so rows can be appended to a file
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvView } from '../../shared/csv-view.ts';
import { scanCsv } from '../../shared/csv-scan.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { jsonEditor } from '../../shared/unparse-kit.ts';

type Records = Record<string, unknown>[];

// A file that already exists on disk (a till log) and the sale we want to add to it.
const EXISTING = 'date,item,amount\r\n05-13,Tea,4.5';
const NEW_SALES: Records = [{ date: '05-14', item: 'Bread', amount: 2.4 }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Turn the header off to append cleanly. Add a second sale to the JSON.' });
  const f = flow(stage, { from: 'New sales', via: 'Papa.unparse(sales, { header })', to: 'File: old lines + new lines' });
  const oldLines = scanCsv(EXISTING).length;
  let sales = NEW_SALES;

  const unparse = (header: boolean): void => {
    // header: false writes only the data lines, so nothing repeats the column titles.
    const added = Papa.unparse(sales, { header });
    const file = `${EXISTING}\r\n${added}`;
    f.to.show(
      csvView(file, {
        lineClass: (i) => (i < oldLines ? 'pp-dim' : header && i === oldLines ? 'pp-bad' : 'pp-ok'),
      }),
    );
    if (header) stage.say('header: true repeats the titles mid-file.', 'bad');
    else stage.say('header: false adds only the new line.', 'ok');
  };

  if (stage.preview) {
    f.from.show(dataTable(sales, { numbered: false }));
    stage.cycle([true, false], 2800, (h) => {
      unparse(h);
      revealRows(f.to.body);
    });
  } else {
    let header = false;
    checkbox(stage.bar!, 'header (write the titles again)', header, (v) => {
      header = v;
      unparse(header);
    });
    f.from.show(jsonEditor(NEW_SALES, (v) => {
      if (Array.isArray(v) && v.every((r) => typeof r === 'object' && r !== null)) {
        sales = v as Records;
        unparse(header);
      }
    }, 5).el);
    unparse(header);
  }
  return stage.dispose;
};

export default mount;
