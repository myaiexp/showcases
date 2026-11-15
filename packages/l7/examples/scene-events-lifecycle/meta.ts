// l7 example: Lifecycle events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lifecycle events",
  summary:
    "loaded fires once while the scene starts; resize fires each time the container changes size (here its width is changed). The docs also list maploaded, which 2.29.1 never emits.",
  section: 'Scene',
  tags: ["loaded", "resize"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
