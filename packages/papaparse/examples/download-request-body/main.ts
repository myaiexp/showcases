// The same URL asked twice: a GET gets every row, a POST body gets one region
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { fakeServer, type ServedFile } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { notice, requestView } from '../../shared/stream-kit.ts';
import { dataTable } from '../../shared/table.ts';

const HEADER = 'region,month,sales';
const ROWS = ['North,Jan,1200', 'South,Jan,900', 'North,Feb,1350', 'South,Feb,980'];
const ASKS = [
  [undefined, 'everything (GET, no body)'],
  ['region=North', 'North only (POST)'],
  ['region=South', 'South only (POST)'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a question: with a body the request becomes a POST and the server answers it.' });
  const served: ServedFile = { body: '', delay: 450 };
  const server = fakeServer({ 'reports/sales.csv': served });
  stage.onDispose(server.dispose);
  const f = flow(stage, { from: 'Requests', via: 'downloadRequestBody', to: 'Result', split: 0.45 });
  const requests = requestView(f.from.body, { max: stage.preview ? 1 : 3 });
  // The stand-in server reads the body of a POST and answers with just that region.
  server.onRequest((r) => {
    if (r.status === undefined) {
      const region = typeof r.body === 'string' ? r.body.replace('region=', '') : '';
      served.body = [HEADER, ...ROWS.filter((row) => !region || row.startsWith(region))].join('\n');
    }
    requests.show(r);
  });

  let run = 0;
  const ask = (body: string | undefined): void => {
    const mine = ++run;
    if (stage.preview) requests.clear();
    f.to.show(notice('waiting for the server…'));
    f.via.textContent = body ? `downloadRequestBody: "${body}"` : 'no downloadRequestBody';
    stage.say(body ? 'A body makes it a POST: a question.' : 'No body: a plain GET.');
    Papa.parse<Record<string, unknown>>(server.url('reports/sales.csv'), {
      download: true,
      header: true,
      dynamicTyping: true,
      // Setting a body switches the request from GET to POST and sends this text.
      downloadRequestBody: body,
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(dataTable(results.data, { fields: results.meta.fields, maxRows: 4, numbered: false }));
        stage.say(`${results.data.length} rows came back.`, 'ok');
      },
      error: (err) => {
        if (!stage.disposed && mine === run) f.to.show(notice(`error: ${err.message}`, 'bad'));
      },
    });
  };

  if (stage.preview) stage.cycle([undefined, 'region=North'], 3400, ask);
  else {
    select(stage.bar!, 'Ask for', ASKS.map(([body, label]) => [body, label] as const), ask);
    ask(undefined);
  }
  return stage.dispose;
};

export default mount;
