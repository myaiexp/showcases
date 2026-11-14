// toolbar plugin styled through its `style` and `className` options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const LOOKS: Record<string, Partial<CSSStyleDeclaration>> = {
  slate: { backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,.5)', padding: '8px', opacity: '0.95' },
  light: { backgroundColor: '#f5f5f5', border: '1px solid #e8e8e8', borderRadius: '4px', boxShadow: 'none', padding: '8px', opacity: '0.9' },
  pill: { backgroundColor: '#7e3feb', border: '0', borderRadius: '24px', boxShadow: '0 0 12px #7e3feb88', padding: '8px 16px', opacity: '1' },
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: [56, 24, 24, 24],
        plugins: [
          {
            type: 'toolbar',
            key: 'toolbar',
            className: 'showcase-custom-toolbar',
            style: { ...LOOKS.slate, marginTop: '12px', marginLeft: '12px' },
            getItems: () => [
              { id: 'zoom-in', value: 'zoom-in' },
              { id: 'zoom-out', value: 'zoom-out' },
            ],
          },
        ],
      }),
    );
    await graph.render();

    const names = Object.keys(LOOKS);
    if (stage.bar) {
      select(stage.bar, 'look', names, 'slate', (name) => graph.updatePlugin({ key: 'toolbar', style: LOOKS[name] }));
    } else {
      stage.every(1300, (i) => graph.updatePlugin({ key: 'toolbar', style: LOOKS[names[i % names.length]!] }));
    }
  });

export default mount;
