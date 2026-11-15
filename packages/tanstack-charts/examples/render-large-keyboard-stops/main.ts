// A focus strategy whose navigation order is bounded: pointer focus stays exact
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import type { ChartFocusStrategy } from '@tanstack/charts';
import { focusNearestX } from '@tanstack/charts/focus';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const rows = walk(rng(14), 3000, 0, 1).map((v, i) => ({ id: `r${i}`, i, v }));
type Row = (typeof rows)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the chart, press Tab, then the arrow keys: each press moves 100 rows.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const sparseKeys: ChartFocusStrategy<Row, number, number> = {
    resolve: focusNearestX.resolve,
    group: focusNearestX.group,
    // Keep one stop per 100 rows; Home and End still reach the first and last of these.
    navigation: (points) => points.filter((_, i) => i % 100 === 0),
  };
  const definition = defineChart({
    marks: [lineY(rows, { x: 'i', y: 'v', key: 'id', stroke: '#60a5fa', strokeWidth: 1 })],
    scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    focus: sparseKeys,
    tooltip,
  });
  const host = stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'A dense line with sparse keyboard stops',
      onFocusChange: (point) => {
        if (readout && point) readout.textContent = `${rows.length} points, ${sparseKeys.navigation(host.getScene().points).length} keyboard stops\nfocused row ${point.datum.id}`;
      },
    }),
  );
  if (readout) readout.textContent = `${rows.length} points, ${sparseKeys.navigation(host.getScene().points).length} keyboard stops`;
  if (stage.preview) {
    stage.say('3000 points, 30 keyboard stops');
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
