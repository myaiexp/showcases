// cobe example: offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'offset: move the globe in pixels',
  summary:
    'The globe travels in a slow circle inside its canvas (dashed outline) while it turns, and the caption shows the [x, y] offset. Offset is in CSS pixels from the centre; the full view has an x and a y slider.',
  section: 'Options',
  tags: ['offset', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
