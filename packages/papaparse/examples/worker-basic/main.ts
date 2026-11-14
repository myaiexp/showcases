// worker: true parses on another thread: rows come in complete, not the return
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { csvInput, output } from '../../shared/config-kit.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';

const CSV = 'item,price\nTea,4.20\nMug,7.00\nKettle,31.50';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the worker on and off: the table is the same, but where the rows arrive is not.' });
  const f = flow(stage, { from: 'CSV text', via: 'Papa.parse(csv, { header: true })', to: 'Papa.parse gave back…', split: 0.4 });
  const out = output(stage, f.to);
  const pills = document.createElement('div');
  pills.className = 'pp-stats';
  const input = csvInput(stage, f.from, CSV, () => void run(useWorker));
  let useWorker = false;
  let token = 0;
  const pill = (key: string, value: string, tone?: 'ok' | 'warn'): HTMLElement => {
    const p = document.createElement('span');
    p.className = tone ? `pp-pill pp-${tone}` : 'pp-pill';
    const b = document.createElement('b');
    b.textContent = value;
    p.append(b, ` ${key}`);
    return p;
  };

  const run = (worker: boolean): Promise<void> =>
    new Promise((resolve) => {
      useWorker = worker;
      const mine = ++token;
      const started = performance.now();
      input.paint({});
      f.via.textContent = `Papa.parse(csv, { header: true${worker ? ', worker: true' : ''} })`;
      let returned: unknown;
      const show = (rows: unknown[], fields?: string[]): void => {
        out.show(pills, dataTable(rows, { fields, maxRows: 3, numbered: false }));
        out.pill('thread', worker ? 'worker' : 'page');
        out.pill('complete fired after', `${Math.round(performance.now() - started)} ms`);
      };
      const setPills = (): void =>
        pills.replaceChildren(
          pill('returned', returned === undefined ? 'undefined' : 'the rows', returned === undefined ? 'warn' : 'ok'),
          pill('WORKERS_SUPPORTED', String(Papa.WORKERS_SUPPORTED)),
        );
      let got: Papa.ParseResult<Record<string, unknown>> | undefined;
      const finish = (): void => {
        if (stage.disposed || mine !== token || !got) return resolve();
        show(got.data, got.meta.fields);
        setPills();
        stage.say(worker ? 'The rows came later, through complete.' : 'The rows came back at once (and in complete).', 'ok');
        resolve();
      };
      const options = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<Record<string, unknown>>) => {
          got = results;
          if (worker) finish(); // arrives later, from the worker
        },
      };
      // worker: true parses on a background thread, and Papa.parse then returns nothing.
      returned = worker ? Papa.parse(input.text, { ...options, worker: true }) : Papa.parse(input.text, options);
      if (!worker) finish(); // on the page thread everything has already happened
      else {
        setPills();
        out.show(pills, document.createTextNode('waiting for the worker…'));
        stage.say('The call returned undefined; the worker is busy.');
      }
    });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const worker of [false, true]) {
        out.show();
        stage.say(worker ? 'Now with worker: true…' : 'Normally the parse blocks and returns…');
        await wait(900);
        await run(worker);
        await wait(2300);
      }
    });
  } else {
    checkbox(stage.bar!, 'worker: true', false, (v) => void run(v));
    void run(false);
  }
  return stage.dispose;
};

export default mount;
