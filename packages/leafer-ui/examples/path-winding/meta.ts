// leafer-ui example: Path: windingRule evenodd
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path: windingRule evenodd",
  summary:
    "Two overlapping sub-paths in one Path: with windingRule: 'evenodd' the inner circle is cut out of the rounded square, 'nonzero' fills it. A second Path sits in the hole.",
  section: "Elements",
  tags: ['Path', 'windingRule', 'path'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
