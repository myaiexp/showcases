// show and hide animation stages: hideElement and showElement play fade, translate or nothing
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Stage = string | false | { fields: string[]; duration: number }[];
const PRESETS: Record<'fade' | 'fade, 1500 ms' | 'off', Stage> = {
  fade: 'fade',
  'fade, 1500 ms': [{ fields: ['opacity'], duration: 1500 }],
  off: false,
};
type Preset = keyof typeof PRESETS;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const node = (p: Preset) => ({
      style: { size: 30, fill: '#E86452', labelText: (d: { id: string }) => d.id, labelPlacement: 'bottom' as const },
      animation: { show: PRESETS[p], hide: PRESETS[p] },
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 28,
        data: {
          nodes: ['a', 'b', 'c', 'd'].map((id) => ({ id })),
          edges: [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
            { source: 'c', target: 'd' },
          ],
        },
        node: node('fade'),
        edge: { animation: { show: 'fade', hide: 'fade' } },
        layout: { type: 'grid', cols: 4 },
      }),
    );
    await graph.render();

    // Hiding keeps the element in the data; only its visibility and the stage animation change.
    let preset: Preset = 'fade';
    let hidden = false;
    const flip = async (): Promise<void> => {
      hidden = !hidden;
      graph.setNode(node(preset));
      await (hidden ? graph.hideElement(['b', 'c']) : graph.showElement(['b', 'c']));
    };
    if (stage.bar) {
      select(stage.bar, 'show / hide animation', Object.keys(PRESETS) as Preset[], 'fade', (v) => (preset = v));
      button(stage.bar, 'hide b, c', () => void graph.hideElement(['b', 'c']));
      button(stage.bar, 'show b, c', () => void graph.showElement(['b', 'c']));
    } else stage.every(1400, flip);
  });

export default mount;
