// trace with @plot.scatter: points scattered inside an image's outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Points inside a traced outline',
  summary:
    'The trace README\'s @place: @plot.scatter(path: @trace(…)) form: hundreds of dots placed at random inside the outline traced from a cat\'s head, so the picture appears as a cloud of points with its holes left empty. Each seed scatters them again.',
  section: 'Addons',
  tags: ['trace', '@trace', '@plot', '.scatter', '@place'],
  docs: ['repo/src/trace/README.md', 'pages/css-doodle-com/reference/function-plot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
