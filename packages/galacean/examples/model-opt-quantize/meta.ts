// galacean example: Model: mesh quantization
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: mesh quantization",
  summary:
    "One sphere stored as float32 and one stored as normalized 16-bit integers with KHR_mesh_quantization render identically, and the panel compares the two file sizes.",
  section: "Model",
  tags: ['KHR_mesh_quantization','glb','vertex compression'],
  docs: [
    'repo/docs/en/graphics/model/opt.mdx',
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
