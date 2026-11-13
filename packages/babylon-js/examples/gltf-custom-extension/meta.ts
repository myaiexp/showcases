// babylon-js example: Custom glTF loader extension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom glTF loader extension",
  summary:
    "A glTF loader extension written in the example registers with registerGLTFExtension, reads its own extensionOptions and tints the loaded materials in onReady. Setting enabled: false loads the same file without it.",
  section: "Importing Assets",
  tags: ['registerGLTFExtension', 'IGLTFLoaderExtension', 'extensionOptions', 'GLTFLoaderExtensionOptions', 'onReady'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/glTF/createExtensions.md',
    'repo/content/features/featuresDeepDive/importers/glTF.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
