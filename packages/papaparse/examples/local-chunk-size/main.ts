// Papa.LocalChunkSize changed around one Papa.parse(file) call
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { ordersCsv, textFile } from '../../shared/data.ts';
import { flow } from '../../shared/panes.ts';
import { createStage } from '../../shared/stage.ts';
import { strip } from '../../shared/stream-kit.ts';
import { stats } from '../../shared/widgets.ts';

const TEXT = ordersCsv(14).replace(/ö/g, 'o');

interface Scene {
  /** The page-wide setting, or undefined to leave it alone. */
  local?: number;
  /** A chunkSize passed in the call itself. */
  chunkSize?: number;
}
const SCENES: Scene[] = [{}, { local: 120 }, { local: 120, chunkSize: 300 }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the page-wide default, or pass chunkSize in the call: the call wins.' });
  const file = textFile('orders.csv', TEXT); // stands in for a file the reader picked
  const f = flow(stage, { from: 'Your code', via: 'the file is read in slices', to: 'chunk callbacks', split: 0.3 });
  const code = document.createElement('div');
  code.className = 'pp-sk-text';
  f.from.show(code);
  const bar = strip(f.to.body, TEXT.length);
  const pills = stats(f.to.body);
  const original = Papa.LocalChunkSize;
  let run = 0;
  let stream = true;

  const show = (scene: Scene): Promise<void> =>
    new Promise((resolve) => {
      const mine = ++run;
      bar.reset();
      const lines = [
        scene.local ? `Papa.LocalChunkSize = ${scene.local};` : '// Papa.LocalChunkSize: untouched',
        `Papa.parse(file, { ${stream ? 'chunk' : 'complete'}${scene.chunkSize ? `, chunkSize: ${scene.chunkSize}` : ''} })`,
        scene.local ? 'Papa.LocalChunkSize = old;' : '',
      ];
      code.replaceChildren(...lines.filter(Boolean).map((l) => Object.assign(document.createElement('div'), { textContent: l })));
      const sizes: number[] = [];
      const old = Papa.LocalChunkSize;
      // Set the page-wide default, start the parse in the same breath, then put it back.
      if (scene.local) Papa.LocalChunkSize = scene.local;
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        chunkSize: scene.chunkSize, // when set, this call ignores Papa.LocalChunkSize
        chunk: stream ? (results) => sizes.push(results.data.length) : undefined,
        complete: async () => {
          if (stage.disposed || mine !== run) return resolve();
          const per = scene.chunkSize ?? scene.local ?? Papa.LocalChunkSize;
          const n = stream ? sizes.length : 1;
          pills.set('chunk callbacks', n, n > 1 ? 'ok' : 'warn');
          pills.set('slice', per >= 1_000_000 ? `${(per / 1_048_576).toFixed(0)} MB` : `${per} B`);
          pills.set('LocalChunkSize now', Papa.LocalChunkSize === original ? 'back to default' : String(Papa.LocalChunkSize), Papa.LocalChunkSize === original ? 'ok' : 'bad');
          for (let i = 0; i < n; i++) {
            if (stream) bar.add(i * per, Math.min((i + 1) * per, TEXT.length), String(sizes[i]));
            else bar.add(0, TEXT.length, 'whole file');
            if (stage.disposed || mine !== run) return resolve();
            await new Promise<void>((r) => stage.after(stage.preview ? 160 : 100, r));
          }
          stage.say(
            !stream ? 'No chunk callback: one read, one complete.' : scene.chunkSize ? 'The chunkSize in the call beats the page default.' : scene.local ? `Page default ${scene.local} B: ${n} slices.` : `Default 10 MB: the whole file is one slice.`,
            'ok',
          );
          resolve();
        },
      });
      Papa.LocalChunkSize = old; // the setting is page-wide: always put it back
    });
  stage.onDispose(() => run++);

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const scene of SCENES) {
        await show(scene);
        await wait(2200);
      }
    });
  } else {
    let scene: Scene = { local: 120 };
    slider(stage.bar!, 'Papa.LocalChunkSize', 30, 500, 10, 120, (v) => void show((scene = { ...scene, local: v })), (v) => `${v} bytes`);
    checkbox(stage.bar!, 'also pass chunkSize: 300', false, (on) => void show((scene = { ...scene, chunkSize: on ? 300 : undefined })));
    checkbox(stage.bar!, 'use a chunk callback', true, (on) => {
      stream = on;
      void show(scene);
    });
    void show(scene);
  }
  return stage.dispose;
};

export default mount;
