// Sparklines: guides: false and margin: 0 leave only the marks, filling the whole box
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const colors = ['#60a5fa', '#fb923c', '#4ade80', '#c084fc'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Four charts with no axes, no grid and no margin.' });
  const boxes = [stage.box, stage.addBox(), stage.addBox(), stage.addBox()];
  boxes.forEach((box, k) => {
    const rows = walk(rng(70 + k), 40, 50, 3).map((value, i) => ({ id: `s${i}`, i, value }));
    const definition = defineChart({
      marks: [
        areaY(rows, { x: 'i', y: 'value', fill: colors[k], fillOpacity: 0.18 }),
        lineY(rows, { x: 'i', y: 'value', stroke: colors[k], strokeWidth: 1.5 }),
      ],
      guides: false,
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true } },
      margin: 0,
    });
    stage.own(mountChart(box, { definition, height: stage.preview ? stage.height : 80, ariaLabel: `Sparkline ${k + 1}` }));
  });
  return () => stage.dispose();
};

export default mount;
