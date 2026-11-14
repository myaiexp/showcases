// A Sortable plugin that listens to drags in lists that never turned it on
import type Sortable from 'sortablejs';

type Note = (text: string) => void;

/** Lists this example cares about, with where to send their news. Everything else on the page is ignored. */
export const watched = new Map<HTMLElement, Note>();

interface Details {
  sortable: Sortable;
  dragEl: HTMLElement;
  oldIndex?: number;
  newIndex?: number;
  rootEl: HTMLElement;
  parentEl: HTMLElement;
}

// No option and no per-list setup: the constructor has nothing to do.
function Spy(): void {}

Spy.prototype = {
  // The "Global" suffix is the whole trick: this runs for every Sortable that has the plugin
  // initialised, not only those that enabled it. It hears about lists from other examples too,
  // so the first job is to check that the list is one of ours.
  dragStartGlobal({ sortable, dragEl }: Details) {
    watched.get(sortable.el)?.(`${dragEl.textContent} picked up`);
  },
  dropGlobal({ sortable, dragEl, rootEl, parentEl, oldIndex, newIndex }: Details) {
    const note = watched.get(sortable.el);
    if (!note || !dragEl) return; // destroy() fires a drop with no item
    const where = rootEl === parentEl ? `moved ${oldIndex} to ${newIndex}` : `went to ${parentEl.dataset['title']}`;
    note(`${dragEl.textContent} ${where}`);
  },
};

// initializeByDefault stays true (the default), which Global events need: the plugin must exist
// on every list, even though nobody ever sets the `spy` option.
Object.assign(Spy, { pluginName: 'spy' });

export default Spy;
