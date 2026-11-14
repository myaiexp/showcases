// Mirrored 5 × 5 pixel avatars from a name, with @seed, @once and @dx
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mirrored pixel avatars',
  summary:
    'The avatars guide\'s GitHub-style identicon: a 5 × 5 grid seeded with a name. @once.ri(65535) draws sixteen random bits once for the whole grid and @once.r(360) one hue; each cell shows or hides itself by the bit at 5 × abs(@dx) + @y, which a column shares with its mirror, so the face is symmetric. Type any name in the full view.',
  section: 'Avatars',
  tags: ['@seed', '@once', '@dx', '$()', 'opacity', '^ enlarge'],
  docs: ['pages/css-doodle-com/avatars.md', 'pages/css-doodle-com/reference/function-once.md', 'pages/css-doodle-com/reference/property-seed.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
