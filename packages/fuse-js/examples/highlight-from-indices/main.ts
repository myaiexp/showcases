// includeMatches indices drawn as brackets under the letters they mark
import Fuse, { type FuseResult } from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS, type Book } from '../../shared/data.ts';
import { highlight } from '../../shared/highlight.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';

/** "└──┘" under each [start, end] range (end included), spaces elsewhere. */
function ruler(length: number, indices: readonly (readonly number[])[]): string {
  const cells = new Array<string>(length).fill(' ');
  for (const [start = 0, end = start] of indices) {
    for (let i = start; i <= end; i++) cells[i] = i === start ? '└' : i === end ? '┘' : '─';
    if (start === end) cells[start] = '^';
  }
  return cells.join('');
}

function card(r: FuseResult<Book>): HTMLElement {
  const box = document.createElement('div');
  box.className = 'hl';
  // The title key's match entry: its indices are inclusive [start, end] pairs.
  const indices = r.matches?.find((m) => m.key === 'title')?.indices ?? [];
  const text = document.createElement('div');
  text.className = 'hl-text';
  text.append(...highlight(r.item.title, indices));
  const under = document.createElement('div');
  under.className = 'hl-ruler';
  under.textContent = ruler(r.item.title.length, indices);
  const pairs = document.createElement('div');
  pairs.className = 'hl-pairs';
  pairs.textContent = `indices: ${JSON.stringify(indices)}`;
  box.append(text, under, pairs);
  return box;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each pair is [first letter, last letter], counted from 0.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Search titles…', tries: ['hobit', 'great', 'wizard sea', 'solitude'] });
  const out = document.createElement('div');
  out.style.cssText = 'display:flex;flex-direction:column;gap:4px';
  stage.root.append(out);

  const fuse = new Fuse(BOOKS, { keys: ['title'], includeMatches: true, threshold: 0.4 });
  const run = (query: string): void => {
    const results = query.trim() ? fuse.search(query, { limit: stage.preview ? 1 : 4 }) : [];
    out.replaceChildren(...results.map(card));
    stage.say(results.length ? `${results.length} shown, each with its matched ranges` : query ? 'No match' : '');
  };
  box.onInput(run);
  typeLoop(stage, box, ['hobit', 'great', 'wizard sea', 'solitude']);
  return stage.dispose;
};

export default mount;
