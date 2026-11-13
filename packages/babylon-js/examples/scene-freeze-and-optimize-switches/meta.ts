// babylon-js example: Freeze and other optimization switches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Freeze and other optimization switches",
  summary:
    "600 boxes and a moving sphere under the optimization switches from the docs: freezeWorldMatrix, material.freeze, doNotSyncBoundingInfo, freezeActiveMeshes (with alwaysSelectAsActiveMesh on the mover), skipPointerMovePicking and blockMaterialDirtyMechanism. Live fps, active mesh count and evaluation time show their effect.",
  section: "Scene",
  tags: ['freezeActiveMeshes', 'freezeWorldMatrix', 'material.freeze', 'alwaysSelectAsActiveMesh', 'doNotSyncBoundingInfo', 'skipPointerMovePicking', 'blockMaterialDirtyMechanism'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/optimize_your_scene.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
