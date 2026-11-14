// Page-wide Chart.js setup: all components registered, dark defaults, dates
import { Chart, registerables } from 'chart.js';
import './date-adapter.ts';

/**
 * Registration and Chart.defaults are page-wide (configuration/index.md § Global
 * Configuration), so they happen once, here. Every Chart.js example imports this through
 * stage.ts. The gallery is dark, so text and grid lines default to light colours
 * (general/colors.md § Default colors). Changing these colours makes the Colors plugin
 * stand aside (it only colours charts that name no colour, defaults included); keeping
 * the stock ones would leave any element without a border colour near-invisible here.
 */
Chart.register(...registerables);

export const INK = '#a1a1aa';
export const GRID = 'rgba(250, 250, 250, 0.09)';

Chart.defaults.color = INK;
Chart.defaults.borderColor = GRID;
Chart.defaults.backgroundColor = 'rgba(232, 163, 8, 0.35)';
Chart.defaults.font.family = 'Inter Variable, Inter, system-ui, sans-serif';
// Radial ticks draw a white label backdrop by default; on a dark page it reads as a hole.
Chart.defaults.scales.radialLinear.ticks.backdropColor = 'transparent';

export { Chart };
