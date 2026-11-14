// babylon-js example: glTF export options and reload
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "glTF export options and reload",
  summary:
    "GLTF2Export.GLBAsync exports the live scene to a glb in memory, with shouldExportNode keeping the camera, light, skybox and debug marker out and shouldExportAnimation and removeNoopRootNodes as toggles. The glb is loaded back beside the original.",
  section: "Exporters",
  tags: ['GLTF2Export', 'GLBAsync', 'shouldExportNode', 'shouldExportAnimation', 'removeNoopRootNodes', 'IExportOptions'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/Exporters/glTFExporter.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
