// d2 example: Hello world
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hello world',
  summary:
    'The tour\'s first diagram: `x -> y: hello world` declares two shapes and a labelled connection between them. D2 places, sizes and routes everything; the card then shows the same line drawn in sketch mode.',
  section: 'Hello World',
  tags: ['connection', 'label', 'sketch'],
  docs: ['repo/docs/tour/hello-world.md', 'repo/static/d2/hello-world.d2', 'repo/d2js/js/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
