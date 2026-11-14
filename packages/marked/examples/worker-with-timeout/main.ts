// Marked in a Web Worker, terminated if it is not done in time
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docPane, note, row, textPane } from '../../shared/panes.ts';
import { button, slider } from '../../shared/controls.ts';
import { diary } from './doc.ts';

interface Done {
  html: string;
  ms: number;
}

/** First few sections of the result, so the page does not have to draw thousands of them. */
function head(html: string, sections = 6): string {
  let at = 0;
  for (let i = 0; i < sections; i++) {
    const next = html.indexOf('<h2', at + 1);
    if (next < 0) return html;
    at = next;
  }
  return html.slice(0, at);
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a document size and a time limit, then press Parse' });
  const info = textPane(stage, 'Worker');
  const doc = docPane(stage, 'Result (first days)');
  row(stage.root, info.el, doc.el);

  let worker: Worker | null = null;
  let timer = 0;
  const stop = (): void => {
    clearTimeout(timer);
    worker?.terminate();
    worker = null;
  };
  stage.onDispose(stop);

  const run = (days: number, limit: number): void => {
    stop();
    const markdown = diary(days);
    const kb = Math.round(markdown.length / 1024);
    const head1 = `Document: ${days} days, ${kb} KB\nTime limit: ${limit} ms\n`;
    info.show(`${head1}\nWorker started...`);
    // The docs' pattern: a worker, a timer that terminates it, and onmessage that cancels the timer.
    const mine = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    worker = mine;
    let started = 0;
    mine.onmessage = (e: MessageEvent<Done | 'ready'>) => {
      if (e.data === 'ready') {
        // Loading Marked into the worker is not parsing time, so the limit starts now.
        started = performance.now();
        timer = window.setTimeout(() => {
          mine.terminate();
          worker = null;
          info.show(`${head1}\nMarked took too long!\nWorker terminated after ${limit} ms.`);
          doc.show('<p><em>No result: the worker was stopped.</em></p>');
        }, limit);
        mine.postMessage(markdown);
        return;
      }
      clearTimeout(timer);
      info.show(`${head1}\nDone. Parsing took ${e.data.ms.toFixed(1)} ms\n(${Math.round(performance.now() - started)} ms including the hand-over)`);
      doc.show(head(e.data.html));
      mine.terminate();
      worker = null;
    };
    mine.onerror = (e) => {
      clearTimeout(timer);
      info.show(`${head1}\nWorker failed: ${e.message}`);
    };
  };

  if (stage.preview) {
    let i = 0;
    stage.play(async (wait) => {
      // A small document fits the limit; a huge one does not.
      const big = i++ % 2 === 1;
      run(big ? 12000 : 40, 250);
      await wait(2800);
    });
  } else {
    let days = 400;
    let limit = 300;
    slider(stage.bar!, 'Days in the diary', 100, 30000, 100, days, (v) => (days = v), (v) => v.toLocaleString());
    slider(stage.bar!, 'Time limit (ms)', 20, 2000, 10, limit, (v) => (limit = v), (v) => `${v}`);
    button(stage.bar!, 'Parse', () => run(days, limit));
    note(stage.root, 'Make the diary longer or the limit shorter until the limit wins: the worker is terminated and the page stays responsive.');
    run(days, limit);
  }
  return () => stage.dispose();
};

export default mount;
