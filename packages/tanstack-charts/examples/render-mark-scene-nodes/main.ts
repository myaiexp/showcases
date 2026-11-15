// A custom mark with no data: it draws one of each scene node kind inside the plot
import { createMark, defineChart, mountChart } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import type { Mount } from '@/types.ts';
import { countNodes } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The readout counts the nodes in the compiled scene, descending into the group.' });
  const readout = stage.preview ? null : stage.readout();

  const sampler = createMark<unknown, never, never>(({ markIndex }) => ({
    id: `sampler-${markIndex}`,
    channels: {},
    render({ chart, theme }) {
      const { width: w, height: h } = chart;
      const wave: [number, number][] = Array.from({ length: 24 }, (_, i) => [(i / 23) * w * 0.4, h * 0.25 + Math.sin(i / 3) * h * 0.12]);
      const nodes: SceneNode[] = [
        { kind: 'rect', key: 'rect', x: chart.x + w * 0.04, y: chart.y + h * 0.1, width: w * 0.2, height: h * 0.35, radius: 6, style: { fill: '#60a5fa', fillOpacity: 0.8 } },
        { kind: 'dot', key: 'dot', x: chart.x + w * 0.34, y: chart.y + h * 0.28, radius: Math.min(w, h) * 0.08, style: { fill: '#fb923c' } },
        { kind: 'rule', key: 'rule', x1: chart.x + w * 0.45, x2: chart.x + w * 0.95, y1: chart.y + h * 0.1, y2: chart.y + h * 0.45, style: { stroke: theme.foreground, strokeWidth: 2 } },
        // A group translates and clips its children, which keep local coordinates.
        {
          kind: 'group',
          key: 'group',
          translateX: chart.x + w * 0.04,
          translateY: chart.y + h * 0.5,
          clip: { x: 0, y: 0, width: w * 0.42, height: h * 0.4 },
          children: [
            { kind: 'area', key: 'area', points: [...wave, [w * 0.4, h * 0.5], [0, h * 0.5]], style: { fill: '#4ade80', fillOpacity: 0.35 } },
            { kind: 'polyline', key: 'polyline', points: wave, style: { stroke: '#4ade80', strokeWidth: 2, fill: 'none' } },
          ],
        },
        { kind: 'label', key: 'label', x: chart.x + w * 0.7, y: chart.y + h * 0.75, text: 'label node', anchor: 'middle', fontSize: 14, style: { fill: theme.foreground } },
      ];
      return { nodes };
    },
  }));

  const definition = defineChart({ marks: [sampler], scales: { x: null, y: null } });
  const host = stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'One of each scene node',
      onRender: ({ scene }) => {
        if (readout) readout.textContent = Object.entries(countNodes(scene.nodes)).map(([k, n]) => `${k}: ${n}`).join('\n');
      },
    }),
  );
  void host;
  return () => stage.dispose();
};

export default mount;
