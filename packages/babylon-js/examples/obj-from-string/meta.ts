// babylon-js example: OBJ loader from a string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OBJ loader from a string",
  summary:
    "OBJ text is loaded from a string with ImportMeshAsync and pluginExtension: a hand-written gem with vertex colours and no normals, and a totem exported by OBJExport. Toggle OBJFileLoader.COMPUTE_NORMALS, IMPORT_VERTEX_COLORS and INVERT_Y.",
  section: "Importing Assets",
  tags: ['OBJFileLoader', 'COMPUTE_NORMALS', 'IMPORT_VERTEX_COLORS', 'INVERT_Y', 'OBJExport', 'ImportMeshAsync'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/oBJ.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
