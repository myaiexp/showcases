// babylon-js example: Custom scene loader plugin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom scene loader plugin",
  summary:
    "An ISceneLoaderPluginAsync for a made-up .shapes text format is registered with RegisterSceneLoaderPlugin as a factory and takes options through pluginOptions. Edit the text and load it with AppendSceneAsync, ImportMeshAsync or LoadAssetContainerAsync.",
  section: "Importing Assets",
  tags: ['RegisterSceneLoaderPlugin', 'ISceneLoaderPluginAsync', 'SceneLoaderPluginOptions', 'pluginOptions', 'AssetContainer'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/importers/createImporters.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
