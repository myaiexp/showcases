// l7 example: Logo control with your own image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Logo control with your own image",
  summary:
    "A Logo control shows any image you give it as img (a data: URL here); without href it links nowhere. setOptions swaps the image.",
  section: "Component",
  tags: ["Logo","img","href","logoVisible"],
  docs: ["repo/site/docs/api/component/logo.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
