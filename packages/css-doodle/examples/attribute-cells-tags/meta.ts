// css-doodle example: The cells attribute: tags clipped to blobs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The cells attribute: tags clipped to blobs",
  summary:
    "cells=\"#tags span\" turns nine page elements into cells: each tag gets its own blob clip-path and colour. Click a tag for new shapes (cards click for you).",
  section: "Attributes",
  tags: ['cells', 'click:update', '@shape', '@R', '@p'],
  docs: [
    'pages/css-doodle-com/reference/attribute-cells.md',
    'pages/css-doodle-com/reference/attribute-click-update.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
