// playcanvas example: A custom texture parser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom texture parser',
  summary:
    "Browsers cannot decode PPM files, so a small parser with canParse, load and open is registered on the texture handler with addParser. Three PPM images generated in code load as normal texture assets; adding a second parser that also claims .ppm shows that the newest parser wins, and removing both shows the built-in fallback failing.",
  section: 'Assets',
  tags: ['ResourceHandler', 'addParser', 'removeParser', 'parsers', 'canParse', 'ResourceLoader', 'Texture', 'Asset'],
  docs: [
    'repo/docs/user-manual/assets/custom-parsers.md',
    'repo/docs/user-manual/assets/supported-formats.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
