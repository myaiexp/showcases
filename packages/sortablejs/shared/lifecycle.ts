// Safe teardown for Sortable instances and one-time plugin mounting; the trap list
//
// Traps for Sortable examples (add to this list when you hit a new one):
// - Sortable holds ONE drag per page in module-level state. destroy() calls _onDrop(), which
//   ends whatever drag is in flight anywhere on the page, another card's included. Tear down
//   with release(...instances), which waits for a foreign drag to finish first.
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
import Sortable from 'sortablejs';

/** Destroys `sortables`, waiting (up to 5 s) while another example's drag is in flight. */
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
  const started = performance.now();
  const id = window.setInterval(() => {
    if (foreignDrag() && performance.now() - started < 5000) return;
    window.clearInterval(id);
    destroy();
  }, 100);
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
