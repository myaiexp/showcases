// A small Sortable plugin: counts how often each item has been moved
import Sortable from 'sortablejs';

// What the plugin keeps per Sortable it is enabled on.
interface Counter {
  sortable: Sortable;
  options: { moveCounterBadge: string; onMoveCounted: (total: number, item: HTMLElement) => void };
  total: number;
  defaults: Record<string, unknown>;
}

// The constructor runs once for each Sortable that turns the plugin on (`new MoveCounter(sortable, el, options)`).
function MoveCounter(this: Counter, _sortable: Sortable, _el: HTMLElement): void {
  this.total = 0;
  // The plugin's own options, with defaults. Users can override them in their options.
  this.defaults = {
    moveCounterBadge: 'moves', // the attribute prefix put on moved items: data-moves
    onMoveCounted: () => undefined, // a callback option, the way onEnd and onSort are
  };
}

// Plugin events are methods on the prototype. They get one object: the Sortable event details.
MoveCounter.prototype = {
  // Fires once the drag has really started (a tap never reaches it): mark the item as lifted.
  dragStart({ dragEl }: { dragEl: HTMLElement }) {
    dragEl.dataset['lifted'] = 'yes';
  },
  // Fires on release. Count the drop only if the item actually changed place.
  drop(this: Counter, { dragEl, oldIndex, newIndex, rootEl, parentEl }: { dragEl: HTMLElement; oldIndex: number; newIndex: number; rootEl: HTMLElement; parentEl: HTMLElement }) {
    // destroy() also fires 'drop', with no item at all: nothing to do then.
    if (!dragEl) return;
    delete dragEl.dataset['lifted'];
    if (oldIndex === newIndex && rootEl === parentEl) return;
    dragEl.dataset['moves'] = String(Number(dragEl.dataset['moves'] ?? 0) + 1);
    this.total++;
    this.options.onMoveCounted(this.total, dragEl);
  },
};

// pluginName is the option that switches the plugin on (and the property it lives under on the Sortable).
// initializeByDefault: false keeps the plugin off every list that does not ask for it.
Object.assign(MoveCounter, { pluginName: 'moveCounter', initializeByDefault: false });

export default MoveCounter;
