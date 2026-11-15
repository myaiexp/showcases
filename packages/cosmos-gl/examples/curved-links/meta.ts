// cosmos-gl example: Curved links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curved links',
  summary:
    'curvedLinks draws links as curves instead of straight lines. curvedLinkSegments sets how many pieces make up each curve, curvedLinkWeight shapes it and curvedLinkControlPointDistance sets how far the curve bows away from the straight line.',
  section: 'Link styling',
  tags: ['curvedLinks', 'curvedLinkSegments', 'curvedLinkWeight', 'curvedLinkControlPointDistance'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
