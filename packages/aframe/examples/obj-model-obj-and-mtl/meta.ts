// aframe example: obj-model: a Wavefront OBJ with its MTL file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "obj-model: a Wavefront OBJ with its MTL file",
  summary: "obj-model takes two selectors to <a-asset-item>s, obj for the geometry and mtl for the materials. A gem generated as OBJ text has Ruby and Garnet groups whose diffuse and specular colours come from the MTL; model-loaded fires when it is in the scene.",
  section: 'Components',
  tags: ["obj-model", "obj", "mtl", "a-asset-item", "model-loaded", "Wavefront"],
  docs: ["repo/docs/components/obj-model.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
