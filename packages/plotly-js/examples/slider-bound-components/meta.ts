// plotly-js example: Components bound to the plot's appearance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Components bound to the plot\'s appearance',
  summary:
    'A slider and a row of buttons all restyle line.color; because they touch one attribute they stay in step with each other and with restyle calls from code.',
  section: 'Slider Events',
  tags: ['sliders', 'updatemenus', 'restyle', 'bound components'],
  docs: ['repo/_posts/plotly_js/controls/callbacks-slider-components/2016-11-03-bindings.html'],
  provenance: 'pure',
  added: '2026-11-15',
});
