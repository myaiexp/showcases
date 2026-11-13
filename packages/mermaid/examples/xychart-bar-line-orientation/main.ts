// XY charts: bars with a line over them, horizontal orientation, point labels and a legend
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A bar series and a line series share one categorical x-axis and a numeric y range.
const REVENUE = `xychart
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]`;

// "xychart horizontal" flips the axes; showDataLabel prints each bar's value.
const HORIZONTAL = `---
config:
  xyChart:
    showDataLabel: true
---
xychart horizontal
    title "Genres in top 100 book survey of 2025"
    x-axis [comedy, romance, mystery, crime, "non fiction", other]
    y-axis "Number of Books" 0 --> 30
    bar [12,2,20,25,17,24]`;

// Named lines appear in the legend; the palette colours series in order.
const LEGEND = `---
config:
  themeVariables:
    xyChart:
      plotColorPalette: '#4e79a7, #f28e2b, #e15759'
---
xychart-beta
  title "Response time"
  x-axis ["90d", "60d", "30d", "7d", "1d", "Current"]
  y-axis "Seconds" 0 --> 198.2
  line "avg" [48.1, 41.5, 45.7, 72.8, 67.7, 59.9]
  line "p50" [38.2, 36.8, 39.7, 54.5, 49.0, 38.4]
  line "p95" [112.2, 75.3, 103.0, 177.0, 180.2, 109.4]`;

// A quoted text after a value labels that point on a line (bars ignore labels).
const LABELLED = `xychart
    title "Smallest AI models scoring above 60% on MMLU"
    x-axis "Date" ["Apr 2022", "Feb 2023", "Jul 2023", "Sep 2023", "Apr 2024"]
    y-axis "Parameters (B)" 0 --> 600
    line [540 "PaLM", 65 "LLaMA-65B", 34 "Llama 2 34B", 7 "Mistral 7B", 3.8 "Phi-3-mini"]`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Bar and line', code: REVENUE },
      { label: 'Horizontal with data labels', code: HORIZONTAL },
      { label: 'Legend and palette', code: LEGEND },
      { label: 'Labelled points', code: LABELLED },
    ],
  });

export default mount;
