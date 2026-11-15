// globe-gl example: Custom layer: click and right-click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layer: click and right-click",
  summary:
    "onCustomLayerClick grows the clicked ball and flies to it; onCustomLayerRightClick shrinks it. Both receive the datum and the clicked coordinates.",
  section: "Custom Layer",
  tags: ['onCustomLayerClick', 'onCustomLayerRightClick', 'customLayerLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
