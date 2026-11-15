// galacean example: Light culling mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Light culling mask",
  summary:
    "A light's cullingMask limits which entity layers it illuminates. One DirectLight lights only Layer1 objects, so the Layer0 shapes stay in the shade; the card flips the mask between layers.",
  section: "Light",
  tags: ['DirectLight', 'cullingMask', 'Layer', 'Entity.layer'],
  docs: [
    'repo/docs/en/graphics/light/directional.mdx',
    'repo/docs/en/graphics/light/point.mdx',
    'repo/docs/en/graphics/light/spot.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
