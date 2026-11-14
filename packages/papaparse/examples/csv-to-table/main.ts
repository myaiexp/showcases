// A spreadsheet export as text becomes a table with named columns and real numbers
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { csvEditor, csvView } from '../../shared/csv-view.ts';
import { flow, revealRows } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable, typeLegend } from '../../shared/table.ts';

const EXPORTS = [
  'name,team,goals,captain\nAda,Red,12,true\nBruno,Blue,7,false\nChen,Red,9,false',
  'city,temp °C,rain\nTurku,4.5,true\nPorto,17,false\nRiga,-2,true',
  'item,price,in stock\nTeapot,24.9,true\nMug,6,false\nKettle,39,true',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the text: the table follows on every keystroke.' });
  const f = flow(stage, {
    from: 'CSV text',
    via: stage.preview ? 'Papa.parse' : 'Papa.parse(text, { header: true, dynamicTyping: true })',
    to: 'Table',
  });

  const parse = (text: string): void => {
    const result = Papa.parse<Record<string, unknown>>(text, {
      header: true, // the first line names the columns
      dynamicTyping: true, // "12" becomes the number 12, "true" the value true
      skipEmptyLines: true, // a trailing blank line is not a row
    });
    const table = dataTable(result.data, { fields: result.meta.fields });
    f.to.show(table, ...(stage.preview ? [] : [typeLegend()]));
    stage.say(`${result.data.length} rows, columns named ${result.meta.fields?.join(', ')}`);
  };

  if (stage.preview) {
    stage.cycle(EXPORTS, 3200, (text) => {
      f.from.show(csvView(text));
      parse(text);
      revealRows(f.to.body);
    });
  } else {
    f.from.show(csvEditor(EXPORTS[0]!, parse).el);
    parse(EXPORTS[0]!);
  }
  return stage.dispose;
};

export default mount;
