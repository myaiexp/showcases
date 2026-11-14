// The landing page's @pattern doodle: a GPU tunnel with no GLSL written
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No GLSL, runs on the GPU',
  summary:
    'The home page\'s @pattern doodle: a few lines of the pattern language march a ray 60 times through a repeating field, rotate it with time, and colour the distance with ramp(). css-doodle compiles it to a WebGL shader and draws it as the cell\'s content.',
  section: 'Getting started',
  tags: ['@pattern', '@content', 'repeat', 'ramp', 't', 'WebGL'],
  docs: ['pages/css-doodle-com.md', 'pages/css-doodle-com/reference/function-pattern.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
