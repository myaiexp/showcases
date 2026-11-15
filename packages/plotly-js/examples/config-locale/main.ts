// config.locale: month names, day names and number formats from a registered locale
import Plotly from 'plotly.js';
import de from 'plotly.js/lib/locales/de.js';
import es from 'plotly.js/lib/locales/es.js';
import fr from 'plotly.js/lib/locales/fr.js';
import ja from 'plotly.js/lib/locales/ja.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const LOCALES = ['en', 'fr', 'de', 'es', 'ja'] as const;
type Locale = (typeof LOCALES)[number];

const mount: Mount = async (el, ctx) => {
  // The docs add a <script> for plotly-locale-fr; here the locale modules are imported
  // and handed to Plotly.register, which makes them known page-wide (a dictionary only
  // matters to a figure whose config.locale names it).
  Plotly.register([fr, de, es, ja]);
  const stage = createStage(el, ctx, { height: 380 });
  const draw = (locale: Locale): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [
        { type: 'scatter', mode: 'lines', x: ['2018-01-01', '2018-08-31'], y: [10, 5], line: { color: '#17BECF' } },
        { type: 'scatter', mode: 'lines', x: ['2018-01-01', '2018-08-31'], y: [3, 7], line: { color: '#a6acb8' } },
      ],
      { template: stage.template, title: { text: stage.preview ? '' : `Custom Locale: ${locale}` }, showlegend: false },
      { ...stage.config, locale },
    );
  await draw('fr');

  if (stage.bar) select(stage.bar, 'config.locale', LOCALES, 'fr', (l) => void draw(l));
  if (stage.preview) stage.every(1500, (i) => void draw(LOCALES[i % LOCALES.length]!));
  return () => stage.dispose();
};

export default mount;
