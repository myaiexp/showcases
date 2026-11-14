// observable-plot example: Transforms: custom initializer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transforms: custom initializer',
  summary:
    'An initializer runs after scales are built and reads the dots\' pixel positions to derive a color channel for the distance from the frame center.',
  section: 'Transforms',
  tags: ['initializer', 'channels', 'dot', 'color'],
  docs: ['repo/docs/features/transforms.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
