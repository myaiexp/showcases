// cosmos-gl example: Point opacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point opacity',
  summary:
    'pointOpacity is one number between 0 and 1 that multiplies the alpha of every point, so overlapping points show through each other. It composes with the alpha in any setPointColors array.',
  section: 'Point styling',
  tags: ['pointOpacity', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
