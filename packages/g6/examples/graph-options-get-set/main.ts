// getOptions() reads the live options; setOptions() applies theme, layout and style changes
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(10, 'n', 90),
        node: { style: { size: 22 } },
        edge: { style: { stroke: '#4a5a7a' } },
        autoFit: 'view',
        layout: { type: 'circular' },
      }),
    );
    await graph.render();

    // The three updates the API page lists, trimmed to settings that show on screen.
    const updates: Record<string, () => Promise<void>> = {
      'Node and edge styles': async () => {
        graph.setOptions({
          node: { style: { fill: '#91d5ff', stroke: '#40a9ff', lineWidth: 2, size: 30 } },
          edge: { style: { stroke: '#91d5ff', lineWidth: 2, endArrow: true } },
        });
        await graph.draw();
      },
      'Theme colours': async () => {
        // The docs' theme object (type plus per-element palettes) is wider than ThemeOptions allows.
        graph.setOptions({
          theme: { type: 'dark', node: { palette: ['#1AAF8B', '#F8E71C', '#8B572A', '#7ED321'] } },
        } as never);
        await graph.draw();
      },
      'Layout: force': async () => {
        graph.setOptions({ layout: { type: 'force', preventOverlap: true } });
        await graph.layout();
      },
      'Layout: circular': async () => {
        graph.setOptions({ layout: { type: 'circular' } });
        await graph.layout();
      },
    };
    const names = Object.keys(updates);

    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        const o = graph.getOptions();
        out.textContent = `getOptions(): autoFit ${JSON.stringify(o.autoFit)}, layout.type ${(o.layout as { type?: string } | undefined)?.type}, node.style ${JSON.stringify(o.node?.style)}`;
      };
      show();
      for (const name of names) button(stage.bar, name, () => void updates[name]!().then(show));
    } else {
      stage.every(1800, (i) => updates[names[i % names.length]!]!());
    }
  });

export default mount;
