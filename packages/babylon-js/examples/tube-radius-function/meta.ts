// babylon-js example: Tube with a radius function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tube with a radius function",
  summary:
    "A tube along a helix path whose radiusFunction swells and pinches the radius, with capped ends.",
  section: 'Mesh',
  tags: ['MeshBuilder.CreateTube', 'radiusFunction', 'cap', 'tessellation'],
  docs: [
    'repo/content/features/featuresDeepDive/mesh/creation/param/tube.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
