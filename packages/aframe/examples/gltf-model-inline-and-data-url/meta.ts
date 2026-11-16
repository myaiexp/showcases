// aframe example: gltf-model: url() inline and a data: URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "gltf-model: url() inline and a data: URL",
  summary: "gltf-model also accepts a url()-enclosed path, though the scene will not wait for it, and a data:model/gltf-binary;base64 URL that embeds a small glb in the markup. The left entity loads a generated duck from url(), the right one from a base64 data URL built from the same bytes.",
  section: 'Components',
  tags: ["gltf-model", "url()", "data URL", "model/gltf-binary", "model-loaded", "glb"],
  docs: ["repo/docs/components/gltf-model.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
