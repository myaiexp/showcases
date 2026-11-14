// A file from the reader's own computer parsed in the browser, never uploaded anywhere
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { filePicker } from '../../shared/controls.ts';
import { textFile } from '../../shared/data.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { fileChip } from '../../shared/widgets.ts';

// Stand-ins for files a reader might pick: made in memory, as if from their disk.
const FILES = [
  textFile('bank-export.csv', 'date,payee,amount\n2026-03-01,Grocer,-42.10\n2026-03-02,Salary,2400\n2026-03-04,Cafe,-3.80'),
  textFile('class-list.csv', 'pupil,age,house\nIvo,11,Oak\nJana,12,Elm\nEmil,11,Oak'),
  textFile('plants.tsv', 'plant\twater\tlight\nFern\tdaily\tshade\nCactus\tmonthly\tsun'),
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open a CSV of your own, or drop one here. It stays on your computer.' });
  const f = flow(stage, { from: 'File', via: 'Papa.parse(file, { complete })', to: 'Table', split: 0.25 });

  const open = (file: File): void => {
    f.from.show(fileChip(file));
    f.to.show(dataTable([], { empty: 'reading…' }));
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      // A file is read in the background, so the rows arrive here, with the file.
      complete: (results, source) => {
        if (stage.disposed) return;
        f.to.show(dataTable(results.data, { fields: results.meta.fields, maxRows: stage.preview ? 4 : 500 }));
        const name = source instanceof File ? source.name : file.name;
        stage.say(`${name}: ${results.data.length} rows, read in this browser.`, 'ok');
      },
    });
  };

  if (stage.preview) stage.cycle(FILES, 3000, open);
  else {
    filePicker(stage.bar!, stage.root, open);
    open(FILES[0]!);
  }
  return stage.dispose;
};

export default mount;
