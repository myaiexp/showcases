// autoResize refits the canvas to its container when the window fires resize
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rebuildable, ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let autoResize = true;
    // autoResize attaches its listener in the constructor, so toggling it rebuilds the graph.
    // The stage's own resize handling only covers graphs passed to stage.keep, so none is kept here.
    const live = rebuildable(
      stage,
      () =>
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: ring(10, 'n', 70),
          node: { style: { size: 18 } },
          autoFit: 'center',
          autoResize,
        }),
    );
    await live.rebuild();

    const out = stage.bar ? readout(el) : null;
    const show = (): void => {
      if (out) out.textContent = `container ${stage.container.clientWidth}px, canvas ${live.graph?.getSize()[0]}px`;
    };
    // The container shrinks; the window event is what autoResize listens for (debounced 300 ms).
    const setWidth = (pct: number): void => {
      stage.container.style.width = `${pct}%`;
      window.dispatchEvent(new Event('resize'));
      stage.after(500, () => {
        void live.graph?.fitCenter();
        show();
      });
      show();
    };
    stage.onCleanup(() => (stage.container.style.width = ''));

    if (stage.bar) {
      slider(stage.bar, 'container width %', [30, 100, 5], 100, setWidth);
      toggle(stage.bar, 'autoResize', autoResize, (v) => ((autoResize = v), void live.rebuild().then(show)));
      show();
    } else {
      stage.every(1800, (i) => setWidth(i % 2 ? 100 : 50));
    }
  });

export default mount;
