// babylon-js example: Import a glb from memory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Import a glb from memory",
  summary:
    "A totem built in code is exported to a glb, then loaded back from a File, raw bytes with pluginExtension, or a base64 data string through AppendSceneAsync, ImportMeshAsync or LoadAssetContainerAsync.",
  section: "Importing Assets",
  tags: ['AppendSceneAsync', 'ImportMeshAsync', 'LoadAssetContainerAsync', 'pluginExtension', 'GLTF2Export'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/loadFromMemory.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
    'repo/content/features/featuresDeepDive/Exporters/glTFExporter.md',
    'repo/content/features/featuresDeepDive/importers/glTF.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
