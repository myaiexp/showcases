// layoutLabels: the labels a custom mark returns beforehand take part in automatic margins
import { createMark, defineChart, lineY, mountChart } from '@tanstack/charts';
import type { MarkRenderContext, SceneLabel } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle layoutLabels and watch the right margin and the label.' });
  const readout = stage.preview ? null : stage.readout();
  if (stage.preview) stage.height -= 34; // room for the caption line
  let reserve = true;

  const endLabel = (reserveMargin: boolean) =>
    createMark<Revenue, string, number>(({ markIndex }) => {
      const last = revenue[revenue.length - 1]!;
      const labels = ({ scales, theme }: MarkRenderContext): SceneLabel[] => [
        { kind: 'label', key: 'end-label', x: scales.x!.map(last.month) + 8, y: scales.y!.map(last.revenue), text: 'June: record month', anchor: 'start', baseline: 'middle', fontSize: 12, style: { fill: theme.foreground } },
      ];
      return {
        id: `end-label-${markIndex}`,
        channels: { x: { scale: 'x', values: [last.month] }, y: { scale: 'y', values: [last.revenue] } },
        // The solver may call layoutLabels several times, so it only builds labels.
        layoutLabels: reserveMargin ? labels : undefined,
        render: (c) => ({ nodes: labels(c) }),
      };
    });

  const options = () => ({
    definition: defineChart({
      marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: true }), endLabel(reserve)],
      scales: { x: { scale: () => scalePoint<string>().padding(0.1) }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    height: stage.height,
    initialWidth: 560,
    ariaLabel: 'Revenue with an end label',
    onRender: ({ scene }: { scene: { margin: { right: number } } }) => {
      if (readout) readout.textContent = `right margin ${scene.margin.right.toFixed(0)} px`;
    },
  });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.bar) {
    checkbox(stage.bar, 'layoutLabels', true, (v) => {
      reserve = v;
      host.update(options());
    });
  } else {
    stage.cycle([true, false], 2200, (v) => {
      reserve = v;
      host.update(options());
      stage.say(v ? 'layoutLabels returns the label' : 'no layoutLabels');
    });
  }
  return () => stage.dispose();
};

export default mount;
