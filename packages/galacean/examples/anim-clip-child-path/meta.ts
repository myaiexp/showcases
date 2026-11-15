// galacean example: Animation: entity paths in a clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: entity paths in a clip",
  summary:
    "One clip with bindings at paths a, a/b and a/b/c swings a three-part arm, plus a position curve on the clip's own entity.",
  section: "Animation",
  tags: ['addCurveBinding','entityPath','AnimationFloatCurve','Transform'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
