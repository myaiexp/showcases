// leafer-ui example: Custom: boundsType, surfaceType, dataType, createAttr
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom: boundsType, surfaceType, dataType, createAttr",
  summary:
    "Attribute handlers decide what a change costs: boundsType re-lays-out and re-renders, surfaceType only re-renders, dataType does neither, and createAttr makes a plain getter and setter that never reaches JSON. The caption counts layout and render passes after each kind.",
  section: "Custom elements",
  tags: ['boundsType', 'surfaceType', 'dataType', 'createAttr', 'toJSON', 'LayoutEvent', 'RenderEvent'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/custom/base/attr.md',
    'pages/www-leaferjs-com/ui/en/reference/display/custom/attr.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
