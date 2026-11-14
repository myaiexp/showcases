// One stream of keystrokes, two searches: on every key, and after a 200 ms pause
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage, type Stage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';
import './style.css';

const WINDOW_MS = 6000; // the timeline shows the last six seconds

/** A strip of ticks: grey for keystrokes, accent for searches, sliding left with time. */
function timeline(parent: HTMLElement, stage: Stage, label: string) {
  const head = document.createElement('div');
  head.className = 'tl-label';
  const strip = document.createElement('div');
  strip.className = 'tl';
  parent.append(head, strip);
  const ticks: { el: HTMLElement; at: number }[] = [];
  let searches = 0;
  const paint = (): void => {
    const now = performance.now();
    for (const t of ticks) t.el.style.left = `${100 - ((now - t.at) / WINDOW_MS) * 100}%`;
    while (ticks.length && now - ticks[0]!.at > WINDOW_MS) ticks.shift()!.el.remove();
  };
  stage.every(50, paint);
  const count = (): void => {
    const b = document.createElement('b');
    b.textContent = String(searches);
    head.replaceChildren(`${label}: `, b, ' searches run');
  };
  count();
  return {
    tick(kind: 'key' | 'search') {
      const el = document.createElement('span');
      el.className = `tick ${kind}`;
      strip.append(el);
      ticks.push({ el, at: performance.now() });
      if (kind === 'search') (searches++, count());
      paint();
    },
  };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type fast, then stop. Grey ticks are keystrokes, coloured ticks are searches.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Type a book title…', tries: ['the hobbit', 'pride and prejudice'] });
  const [eager, calm] = columns(stage, ['Every keystroke', 'After a 200 ms pause']);
  const eagerLine = timeline(eager!.body, stage, 'eager');
  const calmLine = timeline(calm!.body, stage, 'debounced');
  const max = stage.preview ? 1 : 4;
  const eagerList = resultList(eager!.body, { max, scores: false });
  const calmList = resultList(calm!.body, { max, scores: false });

  const fuse = new Fuse(BOOKS, { keys: ['title', 'author'], threshold: 0.4, includeMatches: true });
  const search = (query: string) =>
    fuse.search(query, { limit: 4 }).map((r) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title) }));

  // Debounce: every keystroke restarts a 200 ms timer; only a pause lets the search run.
  let timer: ReturnType<typeof setTimeout> | undefined;
  stage.onDispose(() => clearTimeout(timer));
  box.onInput((query) => {
    eagerLine.tick('key');
    calmLine.tick('key');
    if (query) eagerLine.tick('search');
    eagerList.show(query ? search(query) : [], '…');
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (stage.disposed) return;
      if (query) calmLine.tick('search');
      calmList.show(query ? search(query) : [], '…');
    }, 200);
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const q of ['the hobbit', 'pride and prejudice']) {
        await box.type(q, 80);
        await wait(1500);
        box.set('');
        await wait(600);
      }
    });
  }
  return stage.dispose;
};

export default mount;
