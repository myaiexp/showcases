// step pauses the parse for a pretend 400 ms lookup per row, then resumes it
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flash, flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const CSV = 'order,postcode\n1001,00100\n1002,20500\n1003,90100';
/** The pretend lookup: in real life this would be a request to a server. */
const TOWNS: Record<string, string> = { '00100': 'Helsinki', '20500': 'Turku', '33100': 'Tampere', '90100': 'Oulu' };
const LOOKUP_MS = 400;

interface Row {
  order: string;
  postcode: string;
  town: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each row triggers a 400 ms lookup. Pause holds the parse after the current lookup; Abort ends it.' });
  const f = flow(stage, { from: 'CSV text', via: 'step → pause · lookup · resume', to: 'Rows with their town', split: 0.42 });
  const out = output(stage, f.to);
  let parser: Papa.Parser | undefined;
  let held = false; // the reader pressed Pause
  let resumeLater: (() => void) | undefined;
  let run = 0;
  const input = csvInput(stage, f.from, CSV, () => void start());

  const start = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort();
      held = false;
      resumeLater = undefined;
      const rows: Row[] = [];
      let over = false; // complete has run (finished or aborted): nothing may resume
      const draw = (): void => {
        out.show(dataTable(rows, { numbered: false, empty: 'no rows yet', cellClass: (v, _i, c) => (c === 'town' && v === '…' ? 'pp-hit' : undefined) }));
        input.paint({ lineClass: (i) => (i === 0 ? undefined : i < rows.length ? 'pp-ok' : i === rows.length ? 'pp-hit' : 'pp-dim') });
      };
      draw();
      Papa.parse<Record<string, string>>(input.text, {
        header: true,
        skipEmptyLines: true,
        step: (results, p) => {
          if (mine !== run || stage.disposed) return;
          parser = p;
          const row: Row = { order: results.data['order'] ?? '', postcode: results.data['postcode'] ?? '', town: '…' };
          rows.push(row);
          draw();
          out.pill('parser', 'paused: waiting for the lookup', 'warn');
          stage.say(`Row ${rows.length}: parser paused while ${row.postcode} is looked up…`, 'warn');
          p.pause(); // Papa holds still: no more step calls until resume()
          stage.after(LOOKUP_MS, () => {
            if (over) return;
            row.town = TOWNS[row.postcode] ?? 'unknown';
            draw();
            flash(f.to.body.querySelector('tbody tr:last-child') ?? f.to.body, 'var(--green)');
            const go = (): void => {
              if (over) return;
              out.pill('parser', 'running');
              stage.say(`${row.postcode} is ${row.town}. Resumed.`, 'ok');
              p.resume(); // carry on with the next row
            };
            if (held) {
              out.pill('parser', 'paused by you', 'warn');
              stage.say('Paused by you: press Resume.', 'warn');
              resumeLater = go;
            } else go();
          });
        },
        complete: (results) => {
          over = true;
          if (stage.disposed || mine !== run) return resolve();
          const aborted = results.meta.aborted === true;
          input.paint({ lineClass: (i) => (i === 0 ? undefined : i <= rows.length ? 'pp-ok' : 'pp-dim') });
          out.pill('parser', aborted ? 'aborted' : 'finished', aborted ? 'bad' : 'ok');
          stage.say(aborted ? `Aborted after ${rows.length} rows: the rest is never read.` : `All ${rows.length} rows looked up, one at a time.`, aborted ? 'bad' : 'ok');
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
    button(stage.bar!, 'Pause', () => (held = true));
    button(stage.bar!, 'Resume', () => {
      held = false;
      const go = resumeLater;
      resumeLater = undefined;
      go?.();
    });
    button(stage.bar!, 'Abort', () => parser?.abort());
    button(stage.bar!, 'Run again', () => void start());
    void start();
  }
  return stage.dispose;
};

export default mount;
