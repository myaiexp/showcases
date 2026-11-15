// cosmos-gl example: Link opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link opacity',
  summary:
    'linkOpacity is one number between 0 and 1 that multiplies the alpha of every link. renderLinks set to false stops drawing links altogether, which also saves their cost.',
  section: 'Link styling',
  tags: ['linkOpacity', 'renderLinks', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
