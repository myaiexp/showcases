// deck-gl example: A custom MapController subclass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom MapController subclass",
  summary:
    "A MapController subclass whose handleEvent ignores the wheel unless ctrl is held, passed to the controller prop through type.",
  section: "Controllers",
  tags: ["Controller", "handleEvent", "MapController", "type"],
  docs: ["repo/docs/api-reference/core/map-controller.md", "repo/docs/api-reference/core/controller.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
