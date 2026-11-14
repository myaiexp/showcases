// getExtensions(category) lists what is registered; one node per registered node type
import { ExtensionCategory, getExtension, getExtensions, Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const CATEGORIES = [ExtensionCategory.NODE, ExtensionCategory.EDGE, ExtensionCategory.LAYOUT, ExtensionCategory.PLUGIN] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: [] },
        node: { type: 'rect', style: { size: [96, 26], radius: 6, labelText: (d) => d.id, labelFontSize: 12 } },
        layout: { type: 'grid', cols: 4, rowGap: 14, colGap: 14 },
        autoFit: 'view',
      }),
    );
    await graph.render();

    const out = stage.bar ? readout(el) : null;
    // The registry holds the registered type names as keys: here they become the node ids.
    const show = async (category: (typeof CATEGORIES)[number]): Promise<void> => {
      const names = Object.keys(getExtensions(category));
      graph.setData({ nodes: names.map((id) => ({ id })) });
      await graph.render();
      if (out) out.textContent = `getExtensions('${category}') -> ${names.length} entries\ngetExtension('${category}', '${names[0]}') -> ${typeof getExtension(category, names[0]!)}`;
    };
    await show(ExtensionCategory.NODE);

    if (stage.bar) select(stage.bar, 'category', CATEGORIES, CATEGORIES[0], (v) => void show(v));
    else stage.every(2200, (i) => show(CATEGORIES[i % CATEGORIES.length]!));
  });

export default mount;
