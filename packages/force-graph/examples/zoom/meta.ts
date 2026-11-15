// force-graph example: Render control: zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: zoom',
  summary:
    'zoom(k, ms) sets the canvas scale and animates to it when given a duration; zoom() reads it back, and onZoom reports every change including this one.',
  section: 'Render control',
  tags: ['zoom', 'onZoom', 'zoomToFit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
