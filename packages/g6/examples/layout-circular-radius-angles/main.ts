// Circular layout arcs: angle bounds in degrees converted to radians
import { Graph } from '@antv/g6';
import type { BaseLayoutOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { relayout, ringGraph } from '../../shared/layout-data.ts';

const rad = (deg: number): number => (deg * Math.PI) / 180;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const layout: BaseLayoutOptions = { type: 'circular', radius: 120, startAngle: 0, endAngle: Math.PI * 2, angleRatio: 1 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: ringGraph(24, 0),
        node: { style: { size: 14, labelText: (d) => d.id.slice(1), labelFill: '#fff', labelPlacement: 'center', labelFontSize: 8 } },
        layout: { ...layout },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      slider(stage.bar, 'radius', [40, 200, 5], 120, (radius) => relayout(graph, layout, { radius }));
      slider(stage.bar, 'startAngle°', [0, 360, 10], 0, (v) => relayout(graph, layout, { startAngle: rad(v) }));
      slider(stage.bar, 'endAngle°', [0, 360, 10], 360, (v) => relayout(graph, layout, { endAngle: rad(v) }));
      slider(stage.bar, 'angleRatio', [0.25, 3, 0.25], 1, (angleRatio) => relayout(graph, layout, { angleRatio }));
    } else {
      const steps = [
        { endAngle: rad(180), angleRatio: 1 },
        { endAngle: rad(270), startAngle: rad(90) },
        { endAngle: rad(360), startAngle: 0, angleRatio: 2 },
        { angleRatio: 1 },
      ];
      stage.every(2000, (i) => relayout(graph, layout, steps[i % steps.length]!));
    }
  });

export default mount;
