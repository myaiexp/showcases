// Three registered themes on one graph: setTheme swaps colours and the box background
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const make = (background: string, node: string, edge: string, text: string) => ({
  background,
  node: { style: { size: 30, fill: node, lineWidth: 0, labelFill: text, labelPlacement: 'bottom' as const } },
  edge: { style: { stroke: edge, lineWidth: 2 } },
  combo: { style: { fill: node, fillOpacity: 0.12, stroke: edge, lineWidth: 1, labelFill: text } },
});
const THEMES = {
  'showcase-theme-sunset': make('#2b1330', '#ff7a45', '#c75b7a', '#ffd6c2'),
  'showcase-theme-forest': make('#0f2a1d', '#52c41a', '#3f8f5a', '#d9f7be'),
  'showcase-theme-ice': make('#f0f7ff', '#1677ff', '#91caff', '#10316b'),
};
for (const [name, theme] of Object.entries(THEMES)) register(ExtensionCategory.THEME, name, theme);
type Name = keyof typeof THEMES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const first: Name = 'showcase-theme-sunset';
    stage.container.style.background = THEMES[first].background;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: first,
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: ['a', 'b', 'c', 'd', 'e'].map((id, i) => ({ id, combo: i < 2 ? 'g' : undefined })),
          edges: [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
            { source: 'c', target: 'd' },
            { source: 'd', target: 'e' },
            { source: 'e', target: 'a' },
          ],
          combos: [{ id: 'g' }],
        },
        node: { style: { labelText: (d) => d.id } },
        combo: { style: { labelText: 'combo' } },
        layout: { type: 'circular', radius: 70 },
      }),
    );
    await graph.render();

    const setTheme = async (name: Name): Promise<void> => {
      graph.setTheme(name);
      stage.container.style.background = THEMES[name].background;
      await graph.render();
    };
    const names = Object.keys(THEMES) as Name[];
    if (stage.bar) select(stage.bar, 'theme', names, first, (v) => void setTheme(v));
    else stage.every(1700, (i) => setTheme(names[i % names.length]!));
  });

export default mount;
