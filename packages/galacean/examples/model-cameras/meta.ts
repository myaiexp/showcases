// galacean example: Model: cameras in a glTF
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Model: cameras in a glTF",
  summary:
    "A glTF with a perspective and an orthographic camera node loads them as disabled Camera components in GLTFResource.cameras; switch between them and the stage camera.",
  section: "Model",
  tags: ['GLTFResource.cameras','Camera','isOrthographic'],
  docs: [
    'repo/docs/en/graphics/model/glTF.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
