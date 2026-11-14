// Plot.formatNumber(locale) on an axis and as bar labels, across locales
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const LOCALES = ['en-US', 'de-DE', 'fr-FR', 'es-ES', 'hi-IN', 'ar-EG', 'ja-JP'] as const;

// Values with decimals and thousands, so grouping and decimal marks both show.
const data = [
  { name: 'pi', value: Math.PI * 1000 },
  { name: 'e', value: Math.E * 10000 },
  { name: 'phi', value: 1.618034 * 100000 },
  { name: 'sqrt 2', value: Math.SQRT2 * 500000 },
  { name: 'tau', value: Math.PI * 2 * 1000000 },
];

const mount: Mount = (el, ctx) =>
  mountPlot<{ locale: string }>(el, ctx, {
    initial: { locale: 'en-US' },
    render: ({ locale }, { width, height, preview }) => {
      const format = Plot.formatNumber(locale);
      return Plot.plot({
        width,
        height,
        marginTop: 24,
        marginLeft: preview ? 66 : 80,
        title: preview ? locale : undefined,
        x: { label: null },
        y: { tickFormat: format, grid: true, label: `value, ${locale}` },
        marks: [
          Plot.barY(data, { x: 'name', y: 'value', fill: 'steelblue' }),
          Plot.text(data, { x: 'name', y: 'value', text: (d) => format(d.value), dy: -8, fontSize: preview ? 8 : 11 }),
          Plot.ruleY([0]),
        ],
      });
    },
    step: (_s, i) => ({ locale: LOCALES[i % LOCALES.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'locale', LOCALES, 'en-US', (locale) => live.set({ locale }));
    },
  });

export default mount;
