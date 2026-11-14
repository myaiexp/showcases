// A Sortable plugin that adds shuffle, sortAZ and reverse helpers to Sortable.utils
import type Sortable from 'sortablejs';

/** Reorders the children of `el` with `order`, sliding each one from its old spot to its new one. */
function rearrange(el: HTMLElement, order: (items: HTMLElement[]) => HTMLElement[]): void {
  const items = [...el.children].filter((c) => !c.classList.contains('sortable-fallback')) as HTMLElement[];
  const before = new Map(items.map((i) => [i, i.getBoundingClientRect()]));
  for (const item of order(items)) el.append(item);
  for (const item of items) {
    const from = before.get(item)!;
    const to = item.getBoundingClientRect();
    item.animate(
      [{ transform: `translate(${from.left - to.left}px, ${from.top - to.top}px)` }, { transform: 'none' }],
      { duration: 350, easing: 'ease-out' },
    );
  }
}

function Shuffler(_sortable: Sortable): void {}

Object.assign(Shuffler, {
  pluginName: 'shuffler',
  initializeByDefault: false,
  // Everything in `utils` is copied onto Sortable.utils when the plugin is mounted. No list needs
  // to use the plugin: these are plain functions that anyone can call afterwards.
  utils: {
    shuffle(el: HTMLElement) {
      rearrange(el, (items) => items.sort(() => Math.random() - 0.5));
    },
    sortAZ(el: HTMLElement) {
      rearrange(el, (items) => items.sort((a, b) => (a.textContent ?? '').localeCompare(b.textContent ?? '')));
    },
    reverse(el: HTMLElement) {
      rearrange(el, (items) => items.reverse());
    },
  },
});

export default Shuffler;
