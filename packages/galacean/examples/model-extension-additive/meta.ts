// galacean example: Model: custom extension, additive parse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: custom extension, additive parse",
  summary:
    "A GLTFExtensionParser registered in AdditiveParse mode reads a made-up node extension and adds a spinning Script to each node that carries it.",
  section: "Model",
  tags: ['registerGLTFExtension','GLTFExtensionParser','GLTFExtensionMode','additiveParse'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
