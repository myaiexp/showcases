// A slow server and a patience limit: the bar fills until file or timeout wins
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { fakeServer, type ServedFile } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { notice, requestView } from '../../shared/stream-kit.ts';
import { dataTable } from '../../shared/table.ts';
import { progress } from '../../shared/widgets.ts';

const PRICES = 'fruit,price\nApples,2.40\nPears,3.10\nPlums,4.75';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the server delay past the timeout and watch Papa give up.' });
  const served: ServedFile = { body: PRICES, delay: 400 };
  const server = fakeServer({ 'prices.csv': served });
  stage.onDispose(server.dispose);
  const timeout = 1000; // how long Papa waits, in ms
  const f = flow(stage, { from: `Waiting (patience ${timeout} ms)`, via: `downloadTimeout: ${timeout}`, to: 'Result', split: 0.5 });
  const bar = progress(f.from.body);
  const requests = requestView(f.from.body, { max: 1, timeout: !stage.preview });
  let started = 0; // when the request went out
  let waiting = false;
  server.onRequest((r) => {
    if (r.status === undefined && !r.outcome) {
      started = performance.now();
      waiting = true;
    } else if (waiting) {
      waiting = false;
      const spent = Math.min(performance.now() - started, timeout);
      bar.set(spent / timeout, r.outcome === 'timed out' ? `gave up at ${timeout} ms` : `answered in ${Math.round(spent)} ms`);
    }
    requests.show(r);
  });
  stage.every(50, () => {
    if (waiting) bar.set(Math.min(1, (performance.now() - started) / timeout), `waiting ${((performance.now() - started) / 1000).toFixed(1)} s`);
  });

  let run = 0;
  const download = (): void => {
    const mine = ++run;
    requests.clear();
    bar.set(0);
    f.to.show(notice('waiting for the server…'));
    stage.say(`The server needs ${served.delay} ms. Papa will wait ${timeout}.`);
    Papa.parse<Record<string, unknown>>(server.url('prices.csv'), {
      download: true,
      header: true,
      dynamicTyping: true,
      // Give up after this many milliseconds. (Spread, because the type definitions omit this option.)
      ...{ downloadTimeout: timeout },
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(dataTable(results.data, { fields: results.meta.fields, maxRows: 3, numbered: false }));
        stage.say('In time: the rows arrive.', 'ok');
      },
      // A timeout lands here, not in complete.
      error: (err) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(notice(err.message, 'bad'));
        stage.say('Too slow: Papa gave up, no rows.', 'bad');
      },
    });
  };

  const delays = [400, 2600];
  if (stage.preview) {
    stage.cycle(delays, 3600, (ms) => {
      served.delay = ms;
      download();
    });
  } else {
    slider(stage.bar!, 'Server delay', 100, 3000, 100, served.delay!, (v) => (served.delay = v), (v) => `${v} ms`);
    button(stage.bar!, 'Download', download);
    download();
  }
  return stage.dispose;
};

export default mount;
