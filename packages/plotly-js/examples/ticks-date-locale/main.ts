// A date tickformat written in words, translated by config.locale
import Plotly from 'plotly.js';
import de from 'plotly.js/lib/locales/de.js';
import es from 'plotly.js/lib/locales/es.js';
import fr from 'plotly.js/lib/locales/fr.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const LOCALES = ['fr', 'de', 'es', 'en'] as const;
type Locale = (typeof LOCALES)[number];

const mount: Mount = async (el, ctx) => {
  // The docs load plotly-locale-fr.js with a <script>; here the locale modules are registered.
  Plotly.register([fr, de, es]);
  const stage = createStage(el, ctx, { height: 380 });
  const draw = (locale: Locale): Promise<unknown> =>
    Plotly.react(
      stage.div,
      [{ x: ['2013-02-04', '2013-04-05', '2013-06-06', '2013-08-07', '2013-10-02'], y: [1, 4, 3, 6, 2], type: 'scatter', marker: { size: 9 } }],
      { template: stage.template, xaxis: { tickformat: stage.preview ? '%a %e %b' : '%a %e %b \n %Y' } },
      { ...stage.config, locale },
    );
  await draw('fr');
  if (stage.bar) select(stage.bar, 'config.locale', LOCALES, 'fr', (v) => void draw(v));
  if (stage.preview) stage.every(1400, (i) => void draw(pick(LOCALES, i)));
  return () => stage.dispose();
};

export default mount;
