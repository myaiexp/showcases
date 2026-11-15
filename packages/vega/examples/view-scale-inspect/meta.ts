// vega example: View: Scale Inspection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Inspecting Live Scales',
  summary:
    'view.scale() on a band, a linear and a quantize scale: a console prints their type, domain, range, bandwidth, ticks, invert and thresholds, and re-reads them as the view width changes.',
  section: 'View API',
  tags: ['view.scale', 'view.width', 'scale.type', 'scale.invert'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
