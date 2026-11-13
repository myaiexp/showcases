// babylon-js example: STL loader from a string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "STL loader from a string",
  summary:
    "A totem exported by STLExport as ASCII text and as binary bytes is loaded back with the STL loader, from a data string and from a File holding the bytes. A toggle sets STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES to stop the Y/Z swap.",
  section: "Importing Assets",
  tags: ['STLFileLoader', 'DO_NOT_ALTER_FILE_COORDINATES', 'STLExport', 'pluginExtension'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/stl.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
