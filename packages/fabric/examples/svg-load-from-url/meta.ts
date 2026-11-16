// fabric example: SVG: loadSVGFromURL with a blob URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: loadSVGFromURL with a blob URL',
  summary:
    'loadSVGFromURL(url) fetches an SVG file and parses it. Here the url is a blob: URL made from the editable text with URL.createObjectURL, so the example needs no server.',
  section: 'SVG',
  tags: ['loadSVGFromURL', 'groupSVGElements', 'Blob'],
  docs: [
    'repo/src/content/docs/api/functions/loadSVGFromURL.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
