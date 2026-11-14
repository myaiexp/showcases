// beforeFirstChunk rewrites the start of a file: drop a title, rename a header
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { choose, csvInput, output } from '../../shared/config-kit.ts';
import { csvView } from '../../shared/csv-view.ts';
import { textFile } from '../../shared/data.ts';
import { flow, pane } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const TEXT = 'Orders export 14 Nov (draft)\nid,item,qty\n1001,Tea,3\n1002,Mug,1';
type Fix = 0 | 1 | 2;
const FIXES: readonly (readonly [Fix, string])[] = [
  [0, 'no beforeFirstChunk'],
  [1, 'drop the title line'],
  [2, 'drop it and rename the header'],
];
const VIA = ['Papa.parse(file, { header: true })', 'beforeFirstChunk: drop line 1', 'beforeFirstChunk: drop, rename'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the file, then switch the fix on and off. Papa never sees the struck-out title line.' });
  const f = flow(stage, { from: 'File as saved', via: VIA[0]!, to: 'Rows', split: 0.4 });
  const out = output(stage, f.to);
  const seenPane = stage.preview ? undefined : pane('What Papa was actually given');
  if (seenPane) stage.root.append(seenPane.el);
  let fix: Fix = 0;
  let run = 0;
  const input = csvInput(stage, f.from, TEXT, () => show(fix));

  const show = (which: Fix): void => {
    fix = which;
    const mine = ++run;
    f.via.textContent = VIA[which]!;
    input.paint({ lineClass: (i) => (which >= 1 && i === 0 ? 'pp-strike' : which === 2 && i === 1 ? 'pp-hit' : undefined) });
    let seen = '';
    Papa.parse<Record<string, unknown>>(textFile('orders.csv', input.text), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      // Gets the first chunk as text, before parsing. Return the text Papa should parse.
      beforeFirstChunk:
        which === 0
          ? undefined
          : (chunk) => {
              const lines = chunk.split('\n').slice(1); // drop the title line
              if (which === 2) lines[0] = 'order,product,quantity'; // rename the header
              seen = lines.join('\n');
              return seen;
            },
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        const bad = which === 0;
        out.show(dataTable(results.data, { fields: results.meta.fields, maxRows: 3, numbered: false, cellClass: () => (bad ? 'pp-bad' : undefined) }));
        out.pill('columns', results.meta.fields?.length ?? 0, bad ? 'bad' : 'ok');
        out.pill('errors', results.errors.length, results.errors.length ? 'warn' : 'ok');
        seenPane?.show(csvView(which === 0 ? input.text : seen));
        stage.say(bad ? 'The title line became the header: one wrong column.' : which === 1 ? 'Title gone: the real header is used.' : 'Title gone and the columns are renamed.', bad ? 'bad' : 'ok');
      },
    });
  };

  choose(stage, 'Fix', FIXES, show, 3200);
  return stage.dispose;
};

export default mount;
