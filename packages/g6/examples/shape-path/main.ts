// Atomic path shape: an SVG path string in d, scaled and filled by a custom node
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { d?: string };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class PathShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { d = '', fill, stroke, lineWidth } = attributes;
    return this.upsert('key', 'path', { d, fill, stroke, lineWidth, lineJoin: 'round' }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-path', PathShapeNode);

// Each path is drawn around the origin; k scales every coordinate.
const PATHS = {
  arrow: (k: number) => `M ${-40 * k},${-15 * k} L ${10 * k},${-15 * k} L ${10 * k},${-35 * k} L ${45 * k},0 L ${10 * k},${35 * k} L ${10 * k},${15 * k} L ${-40 * k},${15 * k} Z`,
  wave: (k: number) => `M ${-50 * k},0 C ${-30 * k},${-45 * k} ${-10 * k},${-45 * k} 0,0 S ${30 * k},${45 * k} ${50 * k},0`,
  heart: (k: number) =>
    `M 0,${30 * k} C ${-60 * k},${-5 * k} ${-30 * k},${-45 * k} 0,${-15 * k} C ${30 * k},${-45 * k} ${60 * k},${-5 * k} 0,${30 * k} Z`,
};
type Name = keyof typeof PATHS;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { name: 'arrow' as Name, k: 1.4 };
    const style = () => ({ d: PATHS[v.name](v.k), size: 100 * v.k, fill: v.name === 'wave' ? 'none' : '#9270CA', stroke: '#C9B3F0', lineWidth: 4 });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-path' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    const names = Object.keys(PATHS) as Name[];
    if (stage.bar) {
      select(stage.bar, 'd', names, v.name, (x) => ((v.name = x), void apply()));
      slider(stage.bar, 'scale', [0.5, 2.5, 0.1], v.k, (x) => ((v.k = x), void apply()));
    } else {
      stage.every(1100, (i) => {
        v.name = names[i % names.length]!;
        v.k = 1 + (i % 2) * 0.4;
        return apply();
      });
    }
  });

export default mount;
