// tanstack-charts example: PNG, JPEG or WebP, and what the browser returned
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "PNG, JPEG or WebP, and what the browser returned",
  summary:
    "The type option asks for an encoder, but the browser may return another one. The select requests PNG, JPEG or WebP, with a quality slider for the lossy two. The readout compares the requested type with the blob's real type and size, which is the check the docs give before choosing a file extension.",
  section: "Exporting",
  tags: ['renderChartImage', 'type', 'quality', 'blob.type'],
  docs: [
    'repo/docs/guides/exporting.md',
    'repo/docs/reference/rendering-and-export.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
