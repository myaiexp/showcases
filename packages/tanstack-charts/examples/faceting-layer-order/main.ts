// Layering: background geometry first, annotations last; moving the band last hides what is below
import { areaY, defineChart, dot, lineY, ruleY, text } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const rows = Array.from({ length: 12 }, (_, month) => {
  const median = 40 + 18 * Math.sin(month / 2.2) + month;
  return { month, low: median - 12, high: median + 12, median: Math.round(median * 10) / 10 };
});
const highlights = [rows[3]!, rows[8]!];
const labels = highlights.map((r) => ({ ...r, label: r.month === 3 ? 'peak' : 'late high' }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (bandFirst: boolean) => {
    const band = areaY(rows, { x: 'month', y1: 'low', y2: 'high', fill: '#60a5fa', fillOpacity: 0.85 });
    const rest = [
      lineY(rows, { x: 'month', y: 'median', stroke: '#fbbf24', strokeWidth: 2.5 }),
      dot(highlights, { x: 'month', y: 'median', fill: '#f87171', r: 6 }),
      text(labels, { x: 'month', y: 'median', text: 'label', dy: -12, fill: 'currentColor' }),
    ] as const;
    return defineChart({
      marks: bandFirst ? ([ruleY([0]), band, ...rest] as const) : ([ruleY([0]), ...rest, band] as const),
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear().domain([0, 90]), grid: true } },
    });
  };
  const states = [[true, 'band first: line, dots and labels stay visible'], [false, 'band last: it covers what was drawn before']] as const;
  lab(stage, { label: 'band', ariaLabel: 'Layered band, line, dots and labels', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
