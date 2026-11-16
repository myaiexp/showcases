// aframe example: FAQ: why is the HTML not updating? The debug component
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: why is the HTML not updating? The debug component',
  summary:
    'Component data lives in memory, so the attribute text stays as written. With the debug component on the scene, setAttribute also serialises to the DOM and the attribute text changes. The board reads the real attribute.',
  section: 'Introduction',
  tags: ['debug', 'flushToDOM', 'getAttribute', 'component-to-DOM serialization'],
  docs: ['repo/docs/introduction/faq.md', 'repo/docs/components/debug.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
