// Home view: every package as a card, with category filter, search and sort

import { ALL, SORTS, type SortKey, filterPackages, sortPackages, usedCategories } from '../gallery-logic.ts';
import { type PackageEntry, packages } from '../registry.ts';
import { formatRoute } from '../router.ts';
import { CATEGORIES } from '../types.ts';
import { h } from '../ui/dom.ts';

const state = { category: ALL, query: '', sort: 'newest' as SortKey };

export function renderHome(root: HTMLElement): () => void {
  const grid = h('div', { class: 'card-grid sc-package-grid' });
  const chips = h('div', { class: 'sc-chips', role: 'group', 'aria-label': 'Category' });
  const search = h('input', {
    class: 'input',
    type: 'search',
    placeholder: 'Search packages',
    'aria-label': 'Search packages',
  });
  search.value = state.query;
  const sort = h('select', { class: 'select', 'aria-label': 'Sort' });
  for (const [key, label] of Object.entries(SORTS)) {
    sort.append(h('option', { value: key }, label));
  }
  sort.value = state.sort;

  const total = packages.reduce((n, p) => n + p.exampleCount, 0);
  root.replaceChildren(
    h(
      'header',
      { class: 'sc-page-head' },
      h('h1', {}, 'Showcases'),
      h(
        'p',
        { class: 'dim' },
        `${packages.length} packages, ${total} examples. New examples are built only from each package's own docs.`,
      ),
    ),
    h('div', { class: 'sc-toolbar' }, search, sort),
    chips,
    grid,
  );

  const draw = (): void => {
    chips.replaceChildren(
      ...usedCategories(packages, CATEGORIES).map((cat) => {
        const chip = h('button', { class: 'sc-chip', type: 'button' }, cat);
        chip.classList.toggle('active', cat === state.category);
        chip.addEventListener('click', () => {
          state.category = cat;
          draw();
        });
        return chip;
      }),
    );
    const list = sortPackages(filterPackages(packages, state.category, state.query), state.sort);
    grid.replaceChildren(
      ...(list.length ? list.map(packageCard) : [h('p', { class: 'dim' }, 'No packages match.')]),
    );
  };

  search.addEventListener('input', () => {
    state.query = search.value;
    draw();
  });
  sort.addEventListener('change', () => {
    state.sort = sort.value as SortKey;
    draw();
  });
  draw();
  return () => {};
}

function packageCard(p: PackageEntry): HTMLElement {
  const count = `${p.exampleCount} example${p.exampleCount === 1 ? '' : 's'}`;
  return h(
    'a',
    { class: 'sc-card sc-package-card', href: formatRoute({ view: 'package', pkg: p.slug }) },
    h('div', { class: 'sc-card-title' }, p.name),
    h('p', { class: 'dim' }, p.tagline),
    h('div', { class: 'sc-card-foot' }, h('span', { class: 'tag sc-tag' }, p.category), h('span', { class: 'dim' }, count)),
  );
}
