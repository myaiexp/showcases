// Dark style for Vizzu charts, so they sit on the gallery's dark page
import type { Styles } from 'vizzu';

const INK = '#e4e4e7';
const DIM = '#a1a1aa';
const FAINT = '#3f3f46';

/**
 * Vizzu's defaults are a light theme. This changes colours only (sizes and fonts stay
 * Vizzu's), so an example that sets a font size or padding sees the library's own default
 * next to it. Every example passes it as the constructor's initial state.
 */
export const darkStyle: Styles.Chart = {
  backgroundColor: '#131316',
  borderColor: '#131316',
  title: { color: INK },
  subtitle: { color: DIM },
  caption: { color: DIM },
  legend: {
    title: { color: DIM },
    label: { color: DIM },
  },
  plot: {
    marker: {
      label: { color: INK },
      guides: { color: '#ffffff26' },
    },
    xAxis: {
      color: FAINT,
      title: { color: DIM },
      label: { color: DIM },
      ticks: { color: FAINT },
      guides: { color: '#ffffff1a' },
      interlacing: { color: '#ffffff08' },
    },
    yAxis: {
      color: FAINT,
      title: { color: DIM },
      label: { color: DIM },
      ticks: { color: FAINT },
      guides: { color: '#ffffff1a' },
      interlacing: { color: '#ffffff08' },
    },
  },
  tooltip: {
    color: INK,
    backgroundColor: '#27272a',
    borderColor: '#3f3f46',
  },
  logo: { filter: 'color(#71717a)' },
};
