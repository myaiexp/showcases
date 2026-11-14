// Papa.RemoteChunkSize changed around one download: see it in each Range header
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { ordersCsv } from '../../shared/data.ts';
import { fakeServer, type RequestRecord } from '../../shared/fake-server.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { requestView, strip } from '../../shared/stream-kit.ts';
import { stats } from '../../shared/widgets.ts';

// No accented letters: a Range cuts the file by bytes, which could split one in two.
const BODY = ordersCsv(16).replace(/ö/g, 'o');
const BYTES = new TextEncoder().encode(BODY).length;

interface Scene {
  /** The page-wide setting for this download; undefined leaves the default (5 MB). */
  remote?: number;
  /** Whether the download streams (a chunk callback). */
  stream: boolean;
}
const SCENES: Scene[] = [{ stream: true }, { remote: 200, stream: true }, { remote: 200, stream: false }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the setting and watch the Range header. Turn streaming off and there is no Range at all.' });
  const server = fakeServer({ 'exports/orders.csv': { body: BODY, delay: stage.preview ? 380 : 300 } });
  stage.onDispose(server.dispose);
  const f = flow(stage, { from: 'Your code', via: 'one request per slice', to: 'Requests', split: 0.3 });
  const code = document.createElement('div');
  code.className = 'pp-sk-text';
  f.from.show(code);
  const bar = strip(f.to.body, BYTES);
  const requests = requestView(f.to.body, { max: stage.preview ? 1 : 4 });
  const pills = stats(f.to.body);
  const blocks = new Map<RequestRecord, HTMLElement>();
  server.onRequest((r) => {
    const range = /bytes=(\d+)-(\d+)/.exec(r.headers['Range'] ?? '');
    if (r.status === undefined && !blocks.has(r)) {
      const block = bar.add(range ? Number(range[1]) : 0, range ? Number(range[2]) + 1 : BYTES, '', 'wait');
      blocks.set(r, block);
    }
    const block = blocks.get(r);
    if (block && r.status !== undefined) {
      block.className = 'pp-sk-block pp-sk-ok';
      block.textContent = `${r.bytes} B`;
    }
    requests.show(r);
  });

  let run = 0;
  let parser: Papa.Parser | undefined;
  stage.onDispose(() => {
    run++;
    parser?.abort();
  });

  const download = (scene: Scene): void => {
    const mine = ++run;
    parser?.abort();
    bar.reset();
    blocks.clear();
    requests.clear();
    pills.clear();
    code.replaceChildren(
      ...[
        scene.remote ? `Papa.RemoteChunkSize = ${scene.remote};` : '// Papa.RemoteChunkSize: untouched (5 MB)',
        `Papa.parse(url, { download: true${scene.stream ? ', chunk' : ''} })`,
        scene.remote ? 'Papa.RemoteChunkSize = old;' : '',
      ]
        .filter(Boolean)
        .map((l) => Object.assign(document.createElement('div'), { textContent: l })),
    );
    let calls = 0;
    const old = Papa.RemoteChunkSize;
    // Set the page-wide default, start the download in the same breath, then put it back.
    if (scene.remote) Papa.RemoteChunkSize = scene.remote;
    Papa.parse<Record<string, unknown>>(server.url('exports/orders.csv'), {
      download: true,
      header: true,
      dynamicTyping: true,
      chunk: scene.stream
        ? (results, p) => {
            if (mine !== run || stage.disposed) return;
            parser = p;
            calls++;
            pills.set('chunk callbacks', calls, 'ok');
          }
        : undefined,
      complete: () => {
        if (mine !== run || stage.disposed) return;
        const sent = server.requests.length;
        pills.set('requests', sent, sent > 1 ? 'ok' : 'warn');
        stage.say(
          !scene.stream ? 'Not streaming: one plain request, no Range.' : scene.remote ? `Slices of ${scene.remote} B: ${sent} requests.` : 'Default 5 MB: the whole file in one slice.',
          'ok',
        );
      },
    });
    Papa.RemoteChunkSize = old; // the setting is page-wide: always put it back
  };

  if (stage.preview) stage.cycle(SCENES, 3400, download);
  else {
    let scene: Scene = { remote: 200, stream: true };
    slider(stage.bar!, 'Papa.RemoteChunkSize', 100, 600, 20, 200, (v) => download((scene = { ...scene, remote: v })), (v) => `${v} bytes`);
    checkbox(stage.bar!, 'stream with a chunk callback', true, (on) => download((scene = { ...scene, stream: on })));
    download(scene);
  }
  return stage.dispose;
};

export default mount;
