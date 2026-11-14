// Papa downloads a CSV file from a URL and parses it, with the request drawn as it happens
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { fakeServer } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { dataTable } from '../../shared/table.ts';
import { eventLog } from '../../shared/widgets.ts';

const PRICES = 'fruit,price,unit\nApples,2.40,kg\nPears,3.10,kg\nPlums,4.75,kg\nFigs,0.90,each';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server is pretend: it lives in this page and answers after a delay.' });
  // Stand-in for a real web server, so the example works offline (shared/fake-server.ts).
  const server = fakeServer({ 'prices.csv': { body: PRICES, delay: 700 } });
  stage.onDispose(server.dispose);
  const url = server.url('prices.csv');

  const f = flow(stage, { from: 'Network', via: 'download: true', to: 'Table', split: 0.36 });
  const log = eventLog(f.from.body, 6);
  server.onRequest((r) => {
    if (!r.outcome) log.add(`→ ${r.method} ${r.url}`);
    else log.add(`← ${r.status} ${r.status === 200 ? 'OK' : ''} · ${r.bytes} bytes`, r.status! < 400 ? 'ok' : 'bad');
  });

  const download = (): Promise<void> =>
    new Promise((resolve) => {
      log.clear();
      f.to.show(dataTable([], { empty: 'waiting for the file…' }));
      stage.say('Papa asks the server for the file…');
      Papa.parse<Record<string, unknown>>(url, {
        download: true, // the first argument is a URL, not CSV text
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (stage.disposed) return;
          f.to.show(dataTable(results.data, { fields: results.meta.fields }));
          stage.say(`Downloaded and parsed: ${results.data.length} rows.`, 'ok');
          resolve();
        },
      });
    });

  if (stage.preview) {
    stage.play(async (wait) => {
      await download();
      await wait(2600);
    });
  } else {
    button(stage.bar!, 'Download again', () => void download());
    slider(stage.bar!, 'Server delay', 0, 3000, 100, 700, (ms) => server.serve('prices.csv', { body: PRICES, delay: ms }), (v) => `${v} ms`);
    void download();
  }
  return stage.dispose;
};

export default mount;
