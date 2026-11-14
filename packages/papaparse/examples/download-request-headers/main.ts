// A members-only file: 403 unless the download carries the right token
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, checkbox, textInput } from '../../shared/controls.ts';
import { fakeServer, type ServedFile } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { notice, requestView } from '../../shared/stream-kit.ts';
import { dataTable } from '../../shared/table.ts';

const SECRET = 'abc123';
const REPORT = 'month,sales\nJan,1200\nFeb,1350\nMar,1410';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: `The pretend server only accepts the token "${SECRET}". Try a wrong one.` });
  const served: ServedFile = { body: REPORT, delay: 450 };
  const server = fakeServer({ 'private/report.csv': served });
  stage.onDispose(server.dispose);
  const f = flow(stage, { from: 'Request and answer', via: 'downloadRequestHeaders', to: 'Result', split: 0.45 });
  const requests = requestView(f.from.body, { max: 1 });
  // The stand-in server decides when a request arrives: no right token, no file.
  server.onRequest((r) => {
    if (r.status === undefined) served.status = r.headers['Authorization'] === `token ${SECRET}` ? 200 : 403;
    requests.show(r);
  });

  let run = 0;
  const download = (token: string | undefined): void => {
    const mine = ++run;
    requests.clear();
    f.to.show(notice('waiting for the server…'));
    stage.say(token ? 'Asking again, this time with the token…' : 'Asking without any token…');
    Papa.parse<Record<string, unknown>>(server.url('private/report.csv'), {
      download: true,
      header: true,
      dynamicTyping: true,
      // Extra headers for the request Papa makes. Leave it out and none are sent.
      downloadRequestHeaders: token ? { Authorization: `token ${token}` } : undefined,
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(dataTable(results.data, { fields: results.meta.fields, maxRows: 3, numbered: false }));
        stage.say('The token was accepted: the rows arrive.', 'ok');
      },
      // Called instead of complete when the server answers with an error status.
      error: (err) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(notice(`error callback: ${err.message}`, 'bad'));
        stage.say('No usable token: the server refuses, no rows.', 'bad');
      },
    });
  };

  if (stage.preview) stage.cycle([undefined, SECRET], 3200, download);
  else {
    let send = true;
    let token = SECRET;
    const go = (): void => download(send ? token : undefined);
    checkbox(stage.bar!, 'Send the Authorization header', send, (v) => {
      send = v;
      go();
    });
    textInput(stage.bar!, 'token', token, (v) => (token = v.trim()), 10);
    button(stage.bar!, 'Download', go);
    go();
  }
  return stage.dispose;
};

export default mount;
