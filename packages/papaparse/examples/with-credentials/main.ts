// The same members-only file fetched with and without withCredentials (cookies)
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { fakeServer, type ServedFile } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { notice, requestView } from '../../shared/stream-kit.ts';
import { dataTable } from '../../shared/table.ts';

const MINE = 'order,item,total\n1042,Teapot,34.00\n1057,Honey,8.50';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Your browser holds a login cookie for the shop. Toggle whether the download may send it.' });
  const served: ServedFile = { body: MINE, delay: 450 };
  const server = fakeServer({ 'account/orders.csv': served });
  stage.onDispose(server.dispose);
  const f = flow(stage, { from: 'Cookie jar and request', via: 'withCredentials', to: 'Result', split: 0.5 });
  const jar = document.createElement('div');
  jar.className = 'pp-sk-notice pp-sk-notice-warn';
  jar.textContent = 'shop.example cookie: session=7f3a';
  f.from.body.append(jar);
  const requests = requestView(f.from.body, { max: 1, credentials: true });
  // The stand-in server only recognises a visitor when the cookie came along.
  server.onRequest((r) => {
    if (r.status === undefined) served.status = r.withCredentials ? 200 : 403;
    requests.show(r);
  });

  let run = 0;
  const download = (withCredentials: boolean): void => {
    const mine = ++run;
    requests.clear();
    f.to.show(notice('waiting for the server…'));
    f.via.textContent = `withCredentials: ${withCredentials}`;
    stage.say(withCredentials ? 'The cookie goes along with the request.' : 'The cookie stays home.');
    Papa.parse<Record<string, unknown>>(server.url('account/orders.csv'), {
      download: true,
      header: true,
      dynamicTyping: true,
      // true lets the browser send cookies to the other site; false (the default) does not.
      withCredentials,
      complete: (results) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(dataTable(results.data, { fields: results.meta.fields, numbered: false }));
        stage.say('Recognised as you: your own orders arrive.', 'ok');
      },
      error: (err) => {
        if (stage.disposed || mine !== run) return;
        f.to.show(notice(`error callback: ${err.message}`, 'bad'));
        stage.say('Not logged in as far as the server knows.', 'bad');
      },
    });
  };

  if (stage.preview) stage.cycle([false, true], 3200, download);
  else {
    checkbox(stage.bar!, 'withCredentials', false, download);
    download(false);
  }
  return stage.dispose;
};

export default mount;
