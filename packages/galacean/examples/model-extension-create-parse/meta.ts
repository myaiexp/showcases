// galacean example: Model: custom extension, create and parse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: custom extension, create and parse",
  summary:
    "A GLTFExtensionParser in CreateAndParse mode builds the material for glTF materials that carry a made-up extension, replacing the loader's default PBRMaterial.",
  section: "Model",
  tags: ['registerGLTFExtension','GLTFExtensionMode','createAndParse','UnlitMaterial'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
