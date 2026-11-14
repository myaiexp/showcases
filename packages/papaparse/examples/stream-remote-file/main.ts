// A download fetched in Range requests: each is a block along the file
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { ordersCsv } from '../../shared/data.ts';
import { fakeServer, type RequestRecord, type ServedFile } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { requestView, strip, ticker } from '../../shared/stream-kit.ts';
import { size } from '../../shared/widgets.ts';

// No accented letters: a Range cuts the file by bytes, which could split one in two.
const BODY = ordersCsv(20).replace(/ö/g, 'o');
const BYTES = new TextEncoder().encode(BODY).length;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Make the slices smaller: Papa asks for more, smaller pieces of the same file.' });
  const served: ServedFile = { body: BODY, delay: stage.preview ? 450 : 350 };
  const server = fakeServer({ 'exports/orders.csv': served });
  stage.onDispose(server.dispose);
  const f = flow(stage, { from: `orders.csv on the server (${size(BYTES)})`, via: 'download + chunk + chunkSize', to: 'Rows received', split: 0.5 });
  const bar = strip(f.from.body, BYTES);
  const requests = requestView(f.from.body, { max: stage.preview ? 1 : 4 });
  const tick = ticker(f.to.body, stage.preview ? 1 : 4);
  const blocks = new Map<RequestRecord, HTMLElement>();
  // Each request is drawn as the part of the file it asked for.
  server.onRequest((r) => {
    const range = /bytes=(\d+)-(\d+)/.exec(r.headers['Range'] ?? '');
    if (range) {
      let block = blocks.get(r);
      if (!block) {
        block = bar.add(Number(range[1]), Number(range[2]) + 1, '', 'wait');
        blocks.set(r, block);
      }
      if (r.status !== undefined) {
        block.className = 'pp-sk-block pp-sk-ok';
        block.textContent = `${r.bytes} B`;
      }
    }
    requests.show(r);
  });

  let chunkSize = 260;
  let parser: Papa.Parser | undefined;
  let run = 0;
  stage.onDispose(() => {
    run++;
    parser?.abort();
  });

  const download = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort();
      bar.reset();
      blocks.clear();
      requests.clear();
      tick.latest.replaceChildren();
      tick.stats.clear();
      tick.bar.reset();
      let rows = 0;
      let asked = 0;
      stage.say('Papa asks for the first slice…');
      Papa.parse<Record<string, unknown>>(server.url('exports/orders.csv'), {
        download: true,
        header: true,
        dynamicTyping: true,
        chunkSize, // bytes per request: sent as "Range: bytes=start-end"
        // Called as each slice arrives and is parsed.
        chunk: (results, p) => {
          if (mine !== run || stage.disposed) return;
          parser = p;
          asked++;
          rows += results.data.length;
          tick.stats.set('rows', rows);
          tick.stats.set('requests', asked);
          tick.bar.set(Math.min(1, (asked * chunkSize) / BYTES), `${Math.min(BYTES, asked * chunkSize)} of ${BYTES} B`);
          if (stage.preview) tick.latest.replaceChildren(Object.values(results.data.at(-1) ?? {}).join(' · '));
          else tick.rows(results.data);
          stage.say(`Slice ${asked} landed: ${results.data.length} more rows (${rows} so far).`);
        },
        complete: () => {
          if (mine !== run || stage.disposed) return resolve();
          stage.say(`Whole file fetched in ${asked} requests, ${rows} rows.`, 'ok');
          resolve();
        },
        error: (err) => {
          if (mine === run && !stage.disposed) stage.say(`Download failed: ${err.message}`, 'bad');
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
    slider(stage.bar!, 'chunkSize', 100, 700, 20, chunkSize, (v) => (chunkSize = v), (v) => `${v} bytes`);
    slider(stage.bar!, 'Server delay', 0, 1000, 50, served.delay!, (v) => (served.delay = v), (v) => `${v} ms`);
    button(stage.bar!, 'Download again', () => void download());
    void download();
  }
  return stage.dispose;
};

export default mount;
