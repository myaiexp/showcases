// playcanvas example: Per-body gravity scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-body gravity scale',
  summary:
    'Four balls fall with gravityScale 1, 0.5, 0 and -0.2: normal, gentle, weightless and a rising balloon. A crate resting on the floor shows the catch from the docs: changing gravityScale does not wake a sleeping body, so the crate only lifts off when activate() is called as well, which the check box controls.',
  section: 'Physics',
  tags: ['gravityScale', 'activate', 'isActive', 'teleport'],
  docs: ['repo/docs/user-manual/physics/rigid-bodies.md', 'repo/docs/user-manual/physics/physics-basics.md', 'repo/docs/user-manual/editor/scenes/components/rigidbody.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
