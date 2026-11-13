// babylon-js example: SceneSerializer .babylon round trip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SceneSerializer .babylon round trip",
  summary:
    "SceneSerializer.Serialize turns the whole scene, or SerializeMesh a single mesh, into .babylon JSON; the text is wrapped in a File and appended back to the scene beside the original, with the start of the JSON shown.",
  section: "Exporters",
  tags: ['SceneSerializer', 'Serialize', 'SerializeMesh', 'AppendSceneAsync', '.babylon'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/Exporters/Save_Babylon.md',
    'repo/content/features/featuresDeepDive/importers/loadingFileTypes.md',
    'repo/content/features/featuresDeepDive/importers/createImporters.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
