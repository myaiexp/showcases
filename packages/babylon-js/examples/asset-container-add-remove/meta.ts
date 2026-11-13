// babylon-js example: Asset container add and remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Asset container add and remove",
  summary:
    "A glb is loaded into an AssetContainer that stays out of the scene until addAllToScene() runs, and removeAllFromScene() takes it out again. A second container shelves the hand-made props with moveAllFromScene and a KeepAssets list.",
  section: "Importing Assets",
  tags: ['AssetContainer', 'LoadAssetContainerAsync', 'addAllToScene', 'removeAllFromScene', 'moveAllFromScene', 'KeepAssets'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/assetContainers.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
