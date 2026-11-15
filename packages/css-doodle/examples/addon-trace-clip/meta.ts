// trace: the outline of an image as a clip-path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@trace(): an image's outline as a clip-path",
  summary:
    'The trace addon turns a picture into an outline, an SVG path that path: takes anywhere a shape goes. Here a cat\'s head drawn on a transparent background (a data: URL, so nothing is fetched) becomes @shape(path: @trace(…)) and clips a gradient: in an image with transparency the alpha is the ink, and holes such as the eyes stay holes.',
  section: 'Addons',
  tags: ['trace', '@trace', '@shape', 'path', 'clip-path'],
  docs: ['pages/css-doodle-com/addons.md', 'repo/src/trace/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
