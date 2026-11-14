// A Sortable plugin that adds "how long the item was held" to every event object
import type Sortable from 'sortablejs';

interface Stopwatch {
  sortable: Sortable;
  since: number | null;
}

function Stopwatch(this: Stopwatch, sortable: Sortable): void {
  this.sortable = sortable;
  this.since = null;
}

Stopwatch.prototype = {
  dragStart(this: Stopwatch) {
    this.since = performance.now(); // the drag really began
  },
  nulling(this: Stopwatch) {
    this.since = null; // everything is done: reset
  },
};

Object.assign(Stopwatch, {
  pluginName: 'stopwatch',
  initializeByDefault: false,
  // Called for every event of every Sortable on the page, and its result is merged into the event object
  // the user's callbacks (onStart, onEnd...) receive. `this` is the plugin instance, or undefined for
  // a list that never got the plugin, so check before using it.
  //
  // The plugins README calls this hook `eventOptions`. Sortable 1.15.7 reads it under the name
  // `eventProperties` (see PluginManager.getEventProperties in modular/sortable.esm.js), so that is what works.
  eventProperties(this: Stopwatch | undefined) {
    if (!this) return {};
    return { heldMs: this.since === null ? 0 : Math.round(performance.now() - this.since) };
  },
});

export default Stopwatch;
