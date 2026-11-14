// setLayout(object) and setLayout(prev => next) change options; layout() applies them
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ringGraph } from '../../shared/layout-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        animation: true,
        data: ringGraph(16, 6),
        node: { style: { size: 16 } },
        layout: { type: 'circular' },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    // Example 1 of the docs: a plain object replaces the layout.
    const setObject = (): void => {
      graph.setLayout({ type: 'force', preventOverlap: true, nodeSize: 16, nodeStrength: -50, edgeStrength: 0.5 });
    };
    // Example 2: a function reads the previous options. A force layout gets tuned, anything else becomes radial.
    const setFunction = (): void => {
      graph.setLayout((prev) => {
        const p = prev as { type: string };
        if (p.type === 'force') return { ...p, preventOverlap: true, nodeStrength: -150, linkDistance: 80 };
        return { type: 'radial', unitRadius: 60, preventOverlap: true, nodeSize: 16 };
      });
    };

    if (stage.bar) {
      const out = readout(el);
      const show = (what: string): void => {
        out.textContent = `${what}\ngetLayout().type = ${(graph.getLayout() as { type: string }).type} (nothing moves until layout() runs)`;
      };
      button(stage.bar, 'setLayout({ type: "force", ... })', () => {
        setObject();
        show('setLayout(object) called');
      });
      button(stage.bar, 'setLayout(prev => ...)', () => {
        setFunction();
        show('setLayout(function) called');
      });
      button(stage.bar, 'layout()', async () => {
        await graph.layout();
        await graph.fitView();
        out.textContent = 'layout() finished';
      });
    } else {
      // Cycle: object form, run, function form (tunes force), run, function form again (force stays), reset to circular.
      stage.every(1800, async (i) => {
        const step = i % 4;
        if (step === 1) setObject();
        if (step === 2) setFunction();
        if (step === 3) graph.setLayout({ type: 'circular' });
        if (step === 0) setFunction();
        await graph.layout();
        await graph.fitView();
      });
    }
  });

export default mount;
