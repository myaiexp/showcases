// A guide-only mark: nothing in the base scene, one resolver that draws from the current focus
import { createMark, defineChart, lineY, mountChart } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: the caret and value are drawn by the guide mark, and vanish when the pointer leaves.' });

  const caret = createMark<unknown, never, never>(({ markIndex }) => {
    const id = `caret-${markIndex}`;
    return {
      id,
      channels: {},
      focusGuideOnly: true,
      render({ chart, surface, theme }) {
        return {
          nodes: [],
          focusGuides: [
            {
              key: id,
              markId: id,
              chart,
              surface,
              // The resolver gets the current focus and returns one transient node, or nothing.
              resolve({ focus, guide }): SceneNode | undefined {
                if (!focus) return undefined;
                const x = focus.primary.x;
                const base = guide.chart.y + guide.chart.height;
                return {
                  kind: 'group',
                  key: 'caret',
                  children: [
                    { kind: 'polyline', key: 'caret-shape', points: [[x - 7, base + 14], [x + 7, base + 14], [x, base + 2]], style: { fill: theme.palette[1]!, stroke: theme.palette[1]! } },
                    { kind: 'label', key: 'caret-text', x, y: guide.chart.y + 12, text: `${focus.primary.datum && (focus.primary.datum as { revenue: number }).revenue}k`, anchor: 'middle', fontSize: 13, fontWeight: 600, style: { fill: theme.palette[1]! } },
                  ],
                };
              },
            },
          ],
        };
      },
    };
  });

  const definition = defineChart({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true }), caret],
    scales: { x: { scale: () => scalePoint<string>().padding(0.5) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue with a focus guide' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
