// babylon-js example: glTF loader options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "glTF loader options",
  summary:
    "The same in-memory glb is imported with different glTF loader options: skipMaterials, animationStartMode, and the onParsed, onMeshLoaded and onMaterialLoaded callbacks, passed through pluginOptions.gltf.",
  section: "Importing Assets",
  tags: ['pluginOptions', 'skipMaterials', 'animationStartMode', 'onParsed', 'onMeshLoaded', 'ImportMeshAsync'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/glTF.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
