// plotly-js example: Gapminder animation with a switchable axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gapminder animation with a switchable axis',
  summary:
    'The Gapminder frames with a select that flips the GDP axis between log and linear and a toggle that lights one continent at a time while the years run.',
  section: 'Sliders in Animations',
  tags: ['frames', 'animate', 'yaxis.type', 'restyle opacity', 'sliders'],
  docs: ['repo/_posts/plotly_js/animations/animations-slider/2017-08-22-adding-sliders.html', 'repo/gapminderDataFiveYear.csv'],
  provenance: 'pure',
  added: '2026-11-15',
});
