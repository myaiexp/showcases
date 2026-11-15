// keyedSelection with key: series name, so the overlay marks every row of that series
import { defineChart, dot, lineY, mountChart } from '@tanstack/charts';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { keyedSelection, whenSelected } from '@tanstack/charts/selection';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { traffic, type Traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click any point: the whole series is selected.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let selected: string | null = null;

  const build = () => {
    const selection = keyedSelection<Traffic, string, Date, number>({
      selected: controlledSignal(selected, (next) => choose(next)),
      key: (datum) => datum.series,
    });
    return defineChart({
      marks: [
        lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', strokeWidth: 1.5, strokeOpacity: 0.5, points: true }),
        whenSelected(dot(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', r: 6 }), selection),
        whenSelected(lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', strokeWidth: 4 }), selection),
      ],
      scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
      selection,
      tooltip,
    });
  };
  const options = () => ({ definition: build(), height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel with a selected series' });
  const host = stage.own(mountChart(stage.box, options()));
  function choose(series: string | null): void {
    selected = series;
    host.update(options());
    stage.say(series ? `selected series: ${series}` : 'nothing selected');
  }
  stage.say('nothing selected');
  if (stage.preview) {
    stage.after(500, () => {
      const pts = host.getScene().points;
      const at = (series: string, m: number) => {
        const p = pts.find((q) => (q.datum as Traffic).series === series && (q.datum as Traffic).date.getUTCMonth() === m)!;
        const s = host.getScene();
        return [p.x / s.width, p.y / s.height] as const;
      };
      visit(stage, [at('Web', 3), at('Mobile', 8), at('API', 5)], 1600, { click: () => true, delay: 0 });
    });
  }
  return () => stage.dispose();
};

export default mount;
