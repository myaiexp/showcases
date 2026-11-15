// trace: two levels of one image, overprinted in two inks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A print in two inks with @trace()',
  summary:
    'From the addons guide: @trace(image, level) traced twice, at a high level that takes in the grey hills and sun as well as the dark ground, and at a low level that keeps only the darkest parts. The paths are in the image\'s own pixels, so in an @svg with the image\'s viewBox they line up as a print in red and blue ink.',
  section: 'Addons',
  tags: ['trace', '@trace', '@svg', 'level', '@pn'],
  docs: ['pages/css-doodle-com/addons.md', 'repo/src/trace/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
