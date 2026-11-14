// Custom states: any name works once node.state gives it a style (error, success, warning)
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: ['build', 'test', 'deploy', 'notify'].map((id, i) => ({ id, style: { x: i * 130, y: 0 } })),
          edges: [['build', 'test'], ['test', 'deploy'], ['deploy', 'notify']].map(([source, target]) => ({ source: source!, target: target! })),
        },
        node: {
          style: { size: 44, fill: '#C6E5FF', stroke: '#5B8FF9', lineWidth: 2, labelText: (d) => d.id, labelPlacement: 'bottom' },
          state: {
            error: { fill: '#FFEBE6', stroke: '#FF4D4F', lineWidth: 3, lineDash: [4, 4] },
            success: { fill: '#F6FFED', stroke: '#52C41A', lineWidth: 3 },
            // The docs write icon: { show, text }; in 5.1.1 the flat props are icon and iconText.
            warning: { fill: '#FFFBE6', stroke: '#FAAD14', lineWidth: 3, icon: true, iconText: '!', iconFill: '#FAAD14', iconFontSize: 24 },
          },
        },
        edge: { style: { stroke: '#667', endArrow: true } },
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();

    const ids = ['build', 'test', 'deploy', 'notify'];
    const steps: Record<string, string>[] = [
      { build: 'success' },
      { build: 'success', test: 'warning' },
      { build: 'success', test: 'success', deploy: 'error' },
      {},
    ];
    // A stage gives some nodes a state and clears the rest.
    const show = (k: number): Promise<void> =>
      graph.setElementState(Object.fromEntries(ids.map((id) => [id, steps[k % steps.length]![id] ?? []])));

    let k = 0;
    if (stage.bar) button(stage.bar, 'Next stage', () => void show(++k));
    else stage.every(1200, (i) => show(i));
  });

export default mount;
