// g6 example: Transform: custom circular radial labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: custom circular radial labels",
  summary: "A BaseTransform subclass rotates each label along its ray from the centre of a circular layout in afterLayout. A slider sets offset.",
  section: 'Transform',
  tags: ["BaseTransform", "afterLayout", "labelTransform", "ExtensionCategory.TRANSFORM"],
  docs: [
    "repo/packages/site/docs/manual/transform/custom-transform.en.md",
    "repo/packages/site/common/manual/custom-extension/transform/circular-radial-labels.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
