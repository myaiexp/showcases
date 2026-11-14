// A File is read in slices; chunk gets the rows of each slice as it is read
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { textFile } from '../../shared/data.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { chunkText, strip } from '../../shared/stream-kit.ts';
import { eventLog } from '../../shared/widgets.ts';

const TEXT = 'id,item,qty\n1001,Tea,3\n1002,Mug,1\n1003,Honey,2\n1004,Kettle,1\n1005,Biscuits,4\n1006,Tea,2\n1007,Filter,5';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the chunk size: a smaller slice means more chunk calls, each with fewer rows.' });
  const file = textFile('orders.csv', TEXT); // stands in for a file the reader picked
  let chunkSize = stage.preview ? 36 : 40;
  const f = flow(stage, { from: 'File, cut into slices', via: 'chunk: (results, parser) => …', to: 'Chunks received', split: 0.45 });
  const body = document.createElement('div');
  f.to.show(body);
  let parser: Papa.Parser | undefined;
  let run = 0;

  const start = (): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      parser?.abort();
      f.from.show();
      body.replaceChildren();
      const text = chunkText(f.from.body, TEXT, chunkSize);
      const bar = strip(body, TEXT.length);
      const log = stage.preview ? undefined : eventLog(body, 12);
      const total = Math.ceil(TEXT.length / chunkSize);
      let n = 0;
      stage.say('Papa reads the first slice…');
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        dynamicTyping: true,
        chunkSize, // bytes per slice (the page default is 10 MB, far more than this file)
        // Called once per slice with every complete row in it, instead of once per row.
        chunk: (results, p) => {
          if (mine !== run || stage.disposed) return;
          parser = p;
          const rows = results.data.length;
          text.read(n);
          bar.add(n * chunkSize, (n + 1) * chunkSize, String(rows), rows ? 'ok' : 'warn');
          log?.add(`chunk ${n + 1}: ${rows} rows ${rows ? '(' + results.data.map((r) => r['id']).join(', ') + ')' : '(no complete row yet)'}`);
          stage.say(`Chunk ${n + 1} of ${total}: ${rows} ${rows === 1 ? 'row' : 'rows'} parsed.`);
          n++;
          p.pause(); // slow it down so the slices can be watched
          stage.after(stage.preview ? 750 : 600, () => p.resume());
        },
        complete: () => {
          if (mine === run && !stage.disposed) stage.say(`All ${total} chunks read. Rows cut by a slice edge were rejoined.`, 'ok');
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
      await wait(2600);
    });
  } else {
    slider(stage.bar!, 'chunkSize', 16, 120, 4, chunkSize, (v) => (chunkSize = v), (v) => `${v} bytes`);
    button(stage.bar!, 'Read the file', () => void start());
    void start();
  }
  return stage.dispose;
};

export default mount;
