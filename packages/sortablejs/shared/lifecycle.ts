// Safe teardown for Sortable instances and one-time plugin mounting; the trap list
//
// Traps for Sortable examples (add to this list when you hit a new one):
// - Sortable holds ONE drag per page in module-level state. destroy() calls _onDrop(), which
//   ends whatever drag is in flight anywhere on the page, another card's included (leaving its
//   AutoScroll running against a null Sortable.active). Tear down with release(...instances),
//   which destroys in a gap of drive.ts's queue, never under another card's drag.
// - Cards have no pointer. Script drags with shared/drive.ts (drive / loopDrive); never
//   dispatch pointer events yourself, since the queue there is what keeps cards apart.
// - A scripted drag is a touch drag, so it always uses the fallback (floating ghost with
//   fallbackClass and dragClass on it). Native drag and drop cannot be scripted at all: an
//   option that only acts on native drags (setData) has to be shown another way in the card.
//   `delay` applies to touch, so `delayOnTouchOnly` cards still wait.
// - Sortable.mount() is page-wide and throws if a plugin name is mounted twice. Use
//   mountOnce(). The default build already mounts AutoScroll and OnSpill (RevertOnSpill,
//   RemoveOnSpill); MultiDrag and Swap need mountOnce(new MultiDrag()) / new Swap().
//   Never import the core or complete builds: each is a second copy of Sortable with its
//   own page-wide state, invisible to Sortable.get/dragged on the default copy.
// - A plugin with initializeByDefault (the default) is instantiated on every Sortable the
//   page creates afterwards. Custom plugins in examples set it false unless global events
//   are the point, and must do nothing unless their option is on.
// - AutoScroll defaults to on and bubbles up to the page. In cards, drive.ts turns it off;
//   pass { autoScroll: true } to keep it for an example about AutoScroll, scrolling a box of
//   its own (`scroll: box`, or a list with overflow: auto).
// - Example CSS is global: style Sortable's classes (sortable-ghost, sortable-chosen,
//   sortable-drag, sortable-fallback, sortable-selected, sortable-swap-highlight) only
//   inside the example's scoped block, and prefer custom class names via the options.
// - The fallback ghost is position: fixed, appended to the list (or body with fallbackOnBody).
//   It is a clone of the item, so it needs the item's styles without the list's ancestors:
//   scope item CSS by class under the example, not by `.list > .item`.
// - onMove returning false stops insertion but the drag goes on; onEnd still fires.
// - With native drag and drop the constructor forces touchStartThreshold to 1 (and divides it by
//   devicePixelRatio): pass forceFallback: true for the option to act. A threshold of 0 cancels a
//   delayed drag on any pointermove, even one that does not move.
// - group.revertClone has no visible effect in 1.15.7 on a plain drag: _showClone only reads it while
//   the dragged item is still in its own list, which is never true when a clone is shown.
// - A fallback drag appends the floating copy to the list itself, so list.children counts it:
//   skip Sortable.ghost when counting. The copy carries inline opacity 0.8 and a transform, so
//   style dragClass/fallbackClass with the separate `rotate`/`scale` properties and
//   `opacity: 1 !important`. With fallbackOnBody it sits outside the scoped CSS: style it inline
//   in onStart (Sortable.ghost).
// - chosenClass lands when the delay has elapsed, not on press.
// - forceFallback (and the native/fallback choice) is fixed at creation. To toggle it, call
//   destroy() and create again on the same element; release() may defer, and a late destroy()
//   would unregister the new instance.
// - Sortable.utils.detectDirection is documented but missing from @types/sortablejs: cast.
// - Sortable.active / dragged / ghost / clone are page-wide: a card reading them sees other cards'
//   drags too. Check that the element is inside this example before showing it.
// - The clone event (onClone) fires on every drag, not only when copying: Sortable always makes a
//   stand-in copy.
// - A scripted element.click() inside a card bubbles to the card's link and opens the full view:
//   call the handler directly in cards. Never loop forever inside drive(): it holds the page queue.
// - base.css styles .label, .btn, .card, .status (adds a dot) and .icon (a 14px box): don't use them
//   as an example's own class names.
// - MultiDrag keeps ONE selection for the whole page: a card that leaves items selected hands
//   them to the next multi-drag list's drag. Deselect everything (utils.deselect) at the end of
//   each card round and on cleanup.
// - AutoScroll listens for pointermove only when the instance is not native-draggable, so a
//   scripted (touch) drag never autoscrolls unless the list is created with forceFallback.
// - A plugin's drop/dropGlobal also fire from destroy() with no dragEl: guard them, or release()
//   throws. The plugins README calls the event hook eventOptions; 1.15.7 reads eventProperties,
//   which runs for every Sortable on the page (this undefined where not initialised): guard it.
//   The MultiDrag index objects hold multiDragElement, not the README's element.
import Sortable from 'sortablejs';
import { betweenDrags } from './drive.ts';

/**
 * Destroys `sortables` now when no other example is dragging; otherwise in the next gap between
 * scripted drags (cards loop back to back, so a gap may never come on its own), after any real
 * drag still in flight has ended.
 */
export function release(...sortables: Sortable[]): void {
  const destroy = (): void => {
    for (const s of sortables) {
      // destroy() nulls `el`; a second release is a no-op.
      if (s.el) s.destroy();
    }
  };
  const foreignDrag = (): boolean => {
    const dragged = Sortable.dragged;
    return !!dragged && !sortables.some((s) => s.el && s.el.contains(dragged));
  };
  if (!foreignDrag()) return destroy();
  betweenDrags(
    () =>
      new Promise<void>((done) => {
        // Inside the gap no scripted drag runs, so a drag still in flight is a visitor's own.
        const id = window.setInterval(() => {
          if (foreignDrag()) return;
          window.clearInterval(id);
          destroy();
          done();
        }, 100);
        if (!foreignDrag()) {
          window.clearInterval(id);
          destroy();
          done();
        }
      }),
  );
}

type Plugin = Parameters<typeof Sortable.mount>[0];
const mounted = new Set<string>();

/** Sortable.mount, skipping any plugin already mounted on this page (mount throws on repeats). */
export function mountOnce(...plugins: Plugin[]): void {
  for (const plugin of plugins) {
    const name = (plugin as { pluginName?: string }).pluginName ?? '';
    if (mounted.has(name)) continue;
    mounted.add(name);
    Sortable.mount(plugin);
  }
}
