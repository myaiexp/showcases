// zephyr3d example: Building a compositor chain by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Building a compositor chain by hand',
  summary:
    'Post effects are plain objects. ColorAdjust and Grayscale are created, appended to camera.compositor with appendPostEffect, taken off with removePostEffect, and switched with their enabled flag.',
  section: 'Post-processing',
  tags: ['compositor', 'appendPostEffect', 'removePostEffect', 'ColorAdjust', 'Grayscale', 'enabled'],
  docs: ['repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
