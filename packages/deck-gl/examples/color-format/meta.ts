// deck-gl example: colorFormat RGB and RGBA
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "colorFormat RGB and RGBA",
  summary:
    "Discs whose accessor returns an alpha channel: colorFormat RGBA fades them, RGB ignores the alpha and draws them opaque.",
  section: "Using layers",
  tags: ["colorFormat", "getFillColor", "ScatterplotLayer"],
  docs: ["repo/docs/api-reference/core/layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
