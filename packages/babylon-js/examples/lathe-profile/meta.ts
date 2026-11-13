// babylon-js example: Lathe profile
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lathe profile",
  summary:
    "A vase made by spinning a 2D profile with CreateLathe, next to the same profile cut to half a turn with arc and closed.",
  section: 'Mesh',
  tags: ['MeshBuilder.CreateLathe', 'shape', 'arc', 'tessellation'],
  docs: [
    'repo/content/features/featuresDeepDive/mesh/creation/param/lathe.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
