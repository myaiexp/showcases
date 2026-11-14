// step runs once per row; each is paused so the table visibly grows
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flash, flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const CSV = 'order,customer,total\n1001,Ada,24.50\n1002,Bruno,9.90\n1003,Chen,31.00';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the CSV or slow the rows down: step runs once per row, and complete gets none.' });
  const f = flow(stage, { from: 'CSV text', via: 'step: (results, parser) => …', to: 'Rows your step function received', split: 0.42 });
  const out = output(stage, f.to);
  let parser: Papa.Parser | undefined;
  let delay = 700;
  let run = 0;

  const paint = (done: number): void =>
    input.paint({ lineClass: (i) => (i === 0 ? undefined : i < done ? 'pp-ok' : i === done ? 'pp-hit' : 'pp-dim') });
  const input = csvInput(stage, f.from, CSV, () => void start());

  const start = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort(); // a parse still running from before stops; its complete sees it is stale
      const rows: Record<string, unknown>[] = [];
      let fields: string[] | undefined;
      out.show(dataTable([], { empty: 'no rows yet' }));
      paint(0);
      stage.say('Papa reads the first row…');
      Papa.parse<Record<string, unknown>>(input.text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        // Papa calls this for every row. Without it, one result arrives at the very end.
        step: (results, p) => {
          if (mine !== run || stage.disposed) return;
          parser = p;
          rows.push(results.data);
          fields = results.meta.fields;
          out.show(dataTable(rows, { fields, rowClass: (_r, i) => (i === rows.length - 1 ? 'pp-hit' : undefined) }));
          flash(f.to.body.querySelector('tbody tr:last-child') ?? f.to.body);
          paint(rows.length);
          out.pill('step calls', rows.length);
          stage.say(`step #${rows.length}: ${Object.values(results.data)[1]}'s order arrived.`);
          p.pause(); // hold the parse here, as if the row needed slow work…
          stage.after(delay, () => p.resume()); // …then carry on with the next row
        },
        complete: (results) => {
          if (mine !== run || stage.disposed) return resolve();
          paint(rows.length + 1);
          out.pill('rows in complete', results.data.length, 'warn');
          stage.say(`Done: ${rows.length} step calls. complete got ${results.data.length} rows, so you keep what you need.`, 'ok');
          resolve();
        },
      });
    });
  stage.onDispose(() => {
    run++;
    parser?.abort();
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      await start();
      await wait(2800);
    });
  } else {
    slider(stage.bar!, 'Time per row', 0, 1500, 100, delay, (v) => (delay = v), (v) => `${v} ms`);
    button(stage.bar!, 'Run again', () => void start());
    void start();
  }
  return stage.dispose;
};

export default mount;
