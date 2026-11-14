// g6 example: Download image: toDataURL to a Blob
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Download image: toDataURL to a Blob',
  summary: "The docs' downloadImage(): toDataURL, decode the base64 body into bytes, wrap it in a Blob and click a temporary link. The download button is in the full view; the card re-exports a thumbnail as the graph moves.",
  section: 'Further Reading',
  tags: ['toDataURL', 'Blob', 'URL.createObjectURL'],
  docs: [
    'repo/packages/site/docs/manual/further-reading/download-image.en.md',
    'repo/packages/site/docs/api/export-image.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
