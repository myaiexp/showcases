// aframe example: shadow: cast and receive on their own
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shadow: cast and receive on their own",
  summary: "The shadow component's cast and receive properties are independent. Four boxes stand over a floor in the light of one shadow-casting directional light: one does both, one only casts, one only receives a shadow from a floating ring, and one has neither.",
  section: 'Components',
  tags: ["shadow", "cast", "receive", "castShadow", "light"],
  docs: ["repo/docs/components/shadow.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
