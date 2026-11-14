// observable-plot example: Image: r and rotate channels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image: r and rotate channels',
  summary:
    'Portraits sized by an r channel and turned by a rotate channel computed from net favorability, as the docs tip says images work like dots. The slider scales the tilt.',
  section: 'Mark: Image',
  tags: ['image', 'r', 'rotate', 'preserveAspectRatio'],
  docs: ['repo/docs/marks/image.md', 'repo/docs/marks/dot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
