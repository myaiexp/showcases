// Plot.formatWeekday as an x tickFormat: locale and narrow, short or long names
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const LOCALES = ['en-US', 'es-MX', 'fr-FR', 'de-DE', 'ja-JP', 'ar-EG', 'hi-IN'] as const;
const FORMATS = ['narrow', 'short', 'long'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot<{ locale: string; format: (typeof FORMATS)[number] }>(el, ctx, {
    initial: { locale: 'en-US', format: 'short' },
    render: ({ locale, format }, { width, height, preview }) =>
      Plot.textX(d3.range(7)).plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `${locale}, ${format}` : undefined,
        x: { tickFormat: Plot.formatWeekday(locale, format) },
      }),
    step: (_s, i) => ({ locale: LOCALES[i % LOCALES.length], format: FORMATS[i % FORMATS.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'locale', LOCALES, 'en-US', (locale) => live.set({ locale }));
      select(bar, 'format', FORMATS, 'short', (format) => live.set({ format }));
    },
  });

export default mount;
