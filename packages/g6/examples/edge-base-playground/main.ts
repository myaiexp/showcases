// The BaseEdge online experience: stroke, arrows, label, label background and halo
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const ARROWS = ['triangle', 'circle', 'diamond', 'vee', 'rect', 'triangleRect', 'simple'] as const;
interface Opts {
  lineWidth: number;
  opacity: number;
  startArrow: boolean;
  endArrow: boolean;
  arrowType: (typeof ARROWS)[number];
  label: boolean;
  autoRotate: boolean;
  placement: 'start' | 'center' | 'end';
  offsetY: number;
  padding: number;
  halo: boolean;
}
const edgeOf = (o: Opts): EdgeOptions => ({
  style: {
    stroke: '#7e3feb',
    lineWidth: o.lineWidth,
    opacity: o.opacity,
    startArrow: o.startArrow,
    startArrowType: o.arrowType,
    endArrow: o.endArrow,
    endArrowType: o.arrowType,
    label: o.label,
    labelText: 'node1 to node2',
    labelAutoRotate: o.autoRotate,
    labelPlacement: o.placement,
    labelOffsetY: o.offsetY,
    labelPadding: [1, 10 + o.padding],
    labelBackground: true,
    labelBackgroundFill: '#f9f0ff',
    labelBackgroundFillOpacity: 1,
    labelBackgroundStroke: '#7e3feb',
    labelBackgroundLineWidth: 2,
    labelBackgroundRadius: 4,
    labelFill: '#222',
    halo: o.halo,
    haloLineWidth: 12,
    haloStrokeOpacity: 0.25,
  },
});
const STEPS: Partial<Opts>[] = [
  { endArrow: true, halo: false, placement: 'center' },
  { endArrow: true, startArrow: true, arrowType: 'circle', halo: true },
  { endArrow: true, startArrow: false, arrowType: 'diamond', halo: false, placement: 'end', lineWidth: 5 },
  { endArrow: false, label: false, halo: true, lineWidth: 2 },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o: Opts = {
      lineWidth: 2, opacity: 1, startArrow: false, endArrow: true, arrowType: 'triangle', label: true,
      autoRotate: true, placement: 'center', offsetY: 0, padding: 0, halo: false,
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node1', style: { x: 40, y: 140 } },
            { id: 'node2', style: { x: 240, y: 50 } },
          ],
          edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
        },
        node: { style: { fill: '#f8f8f8', stroke: '#8b9baf', size: 20, labelText: (d) => d.id, labelFontSize: 10 } },
        edge: edgeOf(o),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(o));
      await graph.draw();
    };
    const on = <K extends keyof Opts>(k: K) => (v: Opts[K]): void => {
      o[k] = v;
      void apply();
    };
    if (stage.bar) {
      slider(stage.bar, 'lineWidth', [0, 20, 1], o.lineWidth, on('lineWidth'));
      slider(stage.bar, 'opacity', [0, 1, 0.05], o.opacity, on('opacity'));
      toggle(stage.bar, 'startArrow', o.startArrow, on('startArrow'));
      toggle(stage.bar, 'endArrow', o.endArrow, on('endArrow'));
      select(stage.bar, 'arrow type', ARROWS, o.arrowType, on('arrowType'));
      toggle(stage.bar, 'label', o.label, on('label'));
      toggle(stage.bar, 'labelAutoRotate', o.autoRotate, on('autoRotate'));
      select(stage.bar, 'labelPlacement', ['start', 'center', 'end'] as const, o.placement, on('placement'));
      slider(stage.bar, 'labelOffsetY', [0, 50, 1], o.offsetY, on('offsetY'));
      slider(stage.bar, 'labelPadding (x)', [0, 20, 1], o.padding, on('padding'));
      toggle(stage.bar, 'halo', o.halo, on('halo'));
    } else {
      stage.every(1400, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
