// Zdog example: icons placed on a pixel grid with centered false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Centered false',
  summary:
    'A grid of six little app icons, each tilting on its own spot. With centered: false the scene origin is the top-left corner of the element, so icons can be placed by pixel position like a normal page layout. Tick the box to see what the default, the centre origin, does to the same grid.',
  section: 'API: Illustration',
  tags: ['Illustration', 'centered', 'translate', 'RoundedRect'],
  docs: ['repo/modules/docs/api-illo.hbs', 'repo/modules/docs/shapes-basic.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
