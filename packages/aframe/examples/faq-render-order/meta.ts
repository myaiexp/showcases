// aframe example: FAQ: what order does A-Frame render objects in?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: what order does A-Frame render objects in?',
  summary:
    'Three overlapping transparent planes listed near to far. With sortTransparentObjects off they draw in DOM order and the far panes cover the near ones; on, they sort far to near. Object3D.renderOrder overrides both.',
  section: 'Introduction',
  tags: ['renderer', 'sortTransparentObjects', 'renderOrder', 'transparent', 'opacity'],
  docs: ['repo/docs/introduction/faq.md', 'repo/docs/components/renderer.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
