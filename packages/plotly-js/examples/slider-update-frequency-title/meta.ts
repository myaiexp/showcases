// plotly-js example: Slider steps that update data and title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Slider steps that update data and title',
  summary:
    'A slider of frequencies; each step uses the update method to show one sine trace and set the title, styled with its own ticks and current-value font.',
  section: 'Slider Events',
  tags: ['sliders', 'update', 'visible', 'ticklen', 'currentvalue', 'bgcolor'],
  docs: ['repo/_posts/plotly_js/controls/callbacks-slider-components/2016-11-03-simple-slider.html', 'repo/_data/plotschema.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
