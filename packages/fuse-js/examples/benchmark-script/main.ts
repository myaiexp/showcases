// The Performance page's benchmark: index time and average search time on this device
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BENCH_WORDS } from '../../shared/big-data.ts';
import { button, select, textInput } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the list size or the query, then run it again.' });
  const log = document.createElement('div');
  log.className = 'log';
  stage.root.append(log);

  // -- Configure to match your use case -- (smaller in a card, which must stay light)
  let LIST_SIZE = stage.preview ? 500 : 10_000;
  const KEYS = ['title', 'description', 'category', 'tags'];
  let QUERY = 'javascript';
  const SEARCH_RUNS = stage.preview ? 3 : 100;

  const bench = async (): Promise<void> => {
    log.textContent = `Running on ${LIST_SIZE.toLocaleString('en')} items…`;
    await stage.wait(50);
    const OPTIONS = { keys: KEYS, threshold: 0.4 };

    // -- Generate sample data --
    const randomSentence = (len: number): string =>
      Array.from({ length: len }, () => BENCH_WORDS[Math.floor(Math.random() * BENCH_WORDS.length)]).join(' ');
    const list = Array.from({ length: LIST_SIZE }, () => ({
      title: randomSentence(4),
      description: randomSentence(12),
      category: randomSentence(2),
      tags: randomSentence(6),
    }));

    // -- Benchmark indexing --
    const indexStart = performance.now();
    const fuse = new Fuse(list, OPTIONS);
    const indexTime = performance.now() - indexStart;

    // -- Benchmark search (average over multiple runs) --
    const searchStart = performance.now();
    for (let i = 0; i < SEARCH_RUNS; i++) fuse.search(QUERY);
    const searchTime = (performance.now() - searchStart) / SEARCH_RUNS;

    // -- Results --
    log.textContent = [
      `List size:    ${LIST_SIZE.toLocaleString('en')} items`,
      `Keys:         ${KEYS.join(', ')}`,
      `Index time:   ${indexTime.toFixed(2)}ms`,
      `Search time:  ${searchTime.toFixed(2)}ms (avg over ${SEARCH_RUNS} runs)`,
      `Results:      ${fuse.search(QUERY).length} matches`,
    ].join('\n');
    stage.say(searchTime < 16 ? 'Fast enough to search on every keystroke here' : 'Slower than a frame: consider limit, a stricter threshold, or FuseWorker', searchTime < 16 ? 'ok' : 'warn');
  };
  const fail = (err: unknown): void => {
    if (!stage.disposed) stage.say(String(err), 'bad');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await bench();
      await wait(6000);
    });
  } else if (stage.bar) {
    select(stage.bar, 'LIST_SIZE', [1000, 10_000, 50_000, 100_000].map((n) => [n, n.toLocaleString('en')] as const), (n) => (LIST_SIZE = n), LIST_SIZE);
    textInput(stage.bar, 'QUERY', QUERY, (v) => (QUERY = v), 12);
    button(stage.bar, 'Run benchmark', () => void bench().catch(fail));
    void bench().catch(fail);
  }
  return stage.dispose;
};

export default mount;
