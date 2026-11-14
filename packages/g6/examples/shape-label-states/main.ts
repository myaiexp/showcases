// Label driven by node state: state.hover sets label, labelText and background
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATES = ['none', 'hover', 'selected'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'a', style: { x: 90, y: 100 } },
            { id: 'b', style: { x: 210, y: 100 } },
          ],
          edges: [{ source: 'a', target: 'b' }],
        },
        node: {
          style: {
            size: 36,
            fill: '#5B8FF9',
            // The label is off by default: only the states below show it.
            label: false,
            labelPlacement: 'bottom',
          },
          state: {
            hover: { label: true, labelText: 'shown on hover', labelFill: '#222', labelBackground: true, labelBackgroundFill: '#fffbe6', labelBackgroundRadius: 4 },
            selected: { label: true, labelText: 'selected', labelFill: '#fff', labelBackground: true, labelBackgroundFill: '#E86452', labelPadding: [2, 8], lineWidth: 3, stroke: '#fff' },
          },
        },
      }),
    );
    await graph.render();

    const setState = async (s: (typeof STATES)[number]): Promise<void> => {
      await graph.setElementState({ a: s === 'none' ? [] : [s], b: [] });
    };
    if (stage.bar) select(stage.bar, 'state of node a', STATES, 'none', (v) => void setState(v));
    else stage.every(1300, (i) => setState(STATES[i % STATES.length]!));
  });

export default mount;
