// tanstack-charts example: Reduced motion snaps animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reduced motion snaps animation',
  summary:
    'The default SVG tween respects prefers-reduced-motion. With respectReducedMotion left true the bars snap to their new values when the system asks for less motion. The readout shows the current preference, and a toggle overrides it for this chart only.',
  section: 'Accessibility',
  tags: ['svgAnimation', 'respectReducedMotion', 'prefers-reduced-motion'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
