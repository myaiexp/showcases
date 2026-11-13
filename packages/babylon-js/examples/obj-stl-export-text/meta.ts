// babylon-js example: OBJ and STL export as text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OBJ and STL export as text",
  summary:
    "The totem's meshes go through OBJExport.OBJ and MTL and STLExport.CreateSTL (ASCII or binary), and the resulting text appears on the page instead of downloading. Options for materials, global positions and individual meshes change the output.",
  section: "Exporters",
  tags: ['OBJExport', 'OBJ', 'MTL', 'STLExport', 'CreateSTL', '@babylonjs/serializers'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/Exporters/glTFExporter.md',
    'repo/content/features/featuresDeepDive/importers/oBJ.md',
    'repo/content/features/featuresDeepDive/importers/stl.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
