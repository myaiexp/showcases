// babylon-js example: Asset container as model template
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Asset container as model template",
  summary:
    "One glb is loaded into an AssetContainer and used as a template: instantiateModelsToScene() stamps out renamed duplicates, with materials shared or cloned, and entries.dispose() removes just one batch.",
  section: "Importing Assets",
  tags: ['AssetContainer', 'instantiateModelsToScene', 'InstantiatedEntries', 'cloneMaterials'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/assetContainers.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
