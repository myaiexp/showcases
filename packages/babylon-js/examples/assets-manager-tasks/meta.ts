// babylon-js example: AssetsManager tasks with progress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AssetsManager tasks with progress",
  summary:
    "An AssetsManager runs a mesh task, text, binary, image and texture tasks from in-memory sources, plus one that fails, and logs onProgress, onTaskErrorObservable and onTasksDoneObservable as they fire.",
  section: "Importing Assets",
  tags: ['AssetsManager', 'addMeshTask', 'addTextureTask', 'addTextFileTask', 'onProgress', 'AssetTaskState'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/assetManager.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
