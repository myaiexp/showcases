// The full build and the basic build run the same four searches side by side
import Fuse from 'fuse.js';
import FuseBasic from 'fuse.js/basic';
import type { Mount } from '@/types.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const MENU = [
  { title: 'apple pie', kind: 'dessert' },
  { title: 'apple tart', kind: 'dessert' },
  { title: 'banana bread', kind: 'bread' },
  { title: 'carrot cake', kind: 'dessert' },
  { title: 'pie crust', kind: 'baking' },
];

interface Outcome {
  ok: boolean;
  text: string;
}

// Each feature as one function of the Fuse class it is given, so the same code
// runs on the full build and on the basic one.
type Build = typeof Fuse;
const FEATURES: { name: string; call: (query: string) => string; run: (F: Build, query: string) => unknown[] }[] = [
  {
    name: 'Fuzzy search',
    call: (query) => `search('${query}')`,
    run: (F, query) => new F(MENU, { keys: ['title'] }).search(query),
  },
  {
    name: 'Extended search',
    call: () => `useExtendedSearch, "^apple !tart"`,
    run: (F) => new F(MENU, { keys: ['title'], useExtendedSearch: true }).search('^apple !tart'),
  },
  {
    name: 'Token search',
    call: () => `useTokenSearch, "pie bread"`,
    run: (F) => new F(MENU, { keys: ['title'], useTokenSearch: true }).search('pie bread'),
  },
  {
    name: 'Logical query',
    call: () => `{ $and: [title, kind] }`,
    run: (F) => new F(MENU, { keys: ['title', 'kind'] }).search({ $and: [{ title: 'apple' }, { kind: 'dessert' }] }),
  },
];

const attempt = (F: Build, feature: (typeof FEATURES)[number], query: string): Outcome => {
  try {
    const n = feature.run(F, query).length;
    return { ok: true, text: `${n} result${n === 1 ? '' : 's'}` };
  } catch (err) {
    // The basic build throws as soon as it meets a feature it was built without.
    return { ok: false, text: err instanceof Error ? err.message : String(err) };
  }
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both builds come from the same package: fuse.js and fuse.js/basic.' });
  const box = stage.preview ? null : searchBox(stage.root, stage, { value: 'aple', placeholder: 'Fuzzy query…', tries: ['aple', 'bananna', 'carot'] });
  const table = document.createElement('div');
  table.className = 'fb-table';
  stage.root.append(table);
  const head = document.createElement('div');
  head.className = 'fb-row fb-head';
  head.append(...['', 'fuse.js', 'fuse.js/basic'].map((t) => Object.assign(document.createElement('span'), { textContent: t })));
  table.append(head);

  const cells = FEATURES.map((f) => {
    const row = document.createElement('div');
    row.className = 'fb-row';
    const name = document.createElement('span');
    name.className = 'fb-name';
    name.textContent = f.name;
    const call = document.createElement('code');
    call.className = 'fb-call';
    name.append(call);
    const full = document.createElement('span');
    const basic = document.createElement('span');
    row.append(name, full, basic);
    table.append(row);
    return { f, call, full, basic };
  });

  const paint = (query: string, shown: number): void => {
    cells.forEach(({ f, call, full, basic }, i) => {
      call.textContent = f.call(query);
      for (const [cell, F] of [[full, Fuse], [basic, FuseBasic]] as const) {
        const out = attempt(F as Build, f, query);
        cell.className = i < shown ? `fb-cell ${out.ok ? 'fb-ok' : 'fb-no'}` : 'fb-cell fb-wait';
        cell.textContent = i < shown ? out.text : '…';
      }
    });
    const lost = cells.slice(0, shown).filter((c) => !attempt(FuseBasic as Build, c.f, query).ok).length;
    stage.say(
      shown < FEATURES.length ? 'Running the same searches on both builds…' : `Fuzzy search works in both. The basic build throws on the other ${lost}, so pick it only for plain fuzzy search`,
      shown < FEATURES.length ? 'info' : lost ? 'warn' : 'ok',
    );
  };

  if (stage.preview) stage.cycle([1, 2, 3, 4, 4], 1100, (n) => paint('aple', n));
  else {
    const run = (): void => paint(box?.value.trim() || 'aple', FEATURES.length);
    box?.onInput(run);
    run();
  }
  return stage.dispose;
};

export default mount;
