// cobe example: labels that blur and fade through the visibility fallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blur while hidden',
  summary:
    'City labels that go soft and fade as their markers turn away, then sharpen as they come back. The filter is blur(var(--cobe-visible-{id}, 8px)): while the marker is hidden the variable is undefined and the 8px fallback applies; while it shows, the variable holds an invalid value and the browser drops the filter.',
  section: 'Custom Labels',
  tags: ['--cobe-visible-{id}', 'filter', 'blur', 'opacity', 'transition', 'position-anchor'],
  docs: ['repo/website/app/components/CustomLabels.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
