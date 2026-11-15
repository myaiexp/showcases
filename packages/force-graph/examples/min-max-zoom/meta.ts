// force-graph example: Render control: minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: minZoom and maxZoom',
  summary:
    'minZoom and maxZoom bound the canvas scale for the wheel and for programmatic zoom() alike: asking for zoom(100) or zoom(0.01) stops at the limit, and onZoom reports the clamped value.',
  section: 'Render control',
  tags: ['minZoom', 'maxZoom', 'zoom', 'onZoom'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
