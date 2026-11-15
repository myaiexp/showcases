// The builder context carries defaultTheme: reference marks reuse the shared palette and muted tokens
import { barY, defineChart, mountChart, ruleY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The target rule is drawn with defaultTheme.muted, the bars with palette[1].' });
  const readout = stage.bar ? stage.readout() : null;
  const definition = defineChart({
    chart: ({ defaultTheme }) => {
      if (readout) readout.textContent = `defaultTheme.foreground = ${defaultTheme.foreground}\ndefaultTheme.muted = ${defaultTheme.muted}\ndefaultTheme.palette[1] = ${defaultTheme.palette[1]}`;
      return {
        marks: [
          barY(revenue, { x: 'month', y: 'revenue', fill: defaultTheme.palette[1] }),
          ruleY([60_000], { stroke: defaultTheme.muted, strokeWidth: 2, strokeDasharray: '6 4' }),
        ],
        scales: {
          x: { scale: () => scaleBand<string>().padding(0.2) },
          y: { scale: scaleLinear, nice: true, grid: true },
        },
      };
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Monthly revenue against a 60,000 target' }));
  stage.say('rule: 60,000 target');
  return () => stage.dispose();
};

export default mount;
