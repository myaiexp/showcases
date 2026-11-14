// Found, missing and broken: rows for one answer, the error callback for two
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { fakeServer } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { notice, requestView } from '../../shared/stream-kit.ts';
import { dataTable } from '../../shared/table.ts';

const PRICES = 'fruit,price\nApples,2.40\nPears,3.10\nPlums,4.75';
const PATHS = [
  ['prices.csv', 'prices.csv (exists)'],
  ['price-list-2019.csv', 'price-list-2019.csv (gone)'],
  ['export/today.csv', 'export/today.csv (server crashes)'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a file: one exists, one was deleted (404) and one makes the server fail (500).' });
  const server = fakeServer({
    'prices.csv': { body: PRICES, delay: 350 },
    'price-list-2019.csv': { body: '', status: 404, delay: 350 },
    'export/today.csv': { body: '', status: 500, delay: 350 },
  });
  stage.onDispose(server.dispose);
  const f = flow(stage, { from: 'Request and answer', via: 'download: true', to: 'What your code gets', split: 0.4 });
  const requests = requestView(f.from.body, { max: 1 });
  server.onRequest(requests.show);

  let run = 0;
  const download = (path: string): void => {
    const mine = ++run;
    requests.clear();
    f.to.show(notice('waiting for the server…'));
    stage.say('Papa asks the server…');
    Papa.parse<Record<string, unknown>>(server.url(path), {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(dataTable(results.data, { fields: results.meta.fields, maxRows: 3, numbered: false }));
        stage.say('complete ran: 3 rows.', 'ok');
      },
      // Runs instead of complete when the answer is an error status.
      error: (err) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(notice(`error callback: "${err.message}"`, 'bad'), notice('complete never ran: no rows to use', 'dim'));
        stage.say(`error ran with "${err.message}". Show the reader a message.`, 'bad');
      },
    });
  };

  if (stage.preview) stage.cycle(PATHS.map((p) => p[0]), 3000, download);
  else {
    select(stage.bar!, 'Download', PATHS.map(([path, label]) => [path, label] as const), download);
    download(PATHS[0]![0]);
  }
  return stage.dispose;
};

export default mount;
