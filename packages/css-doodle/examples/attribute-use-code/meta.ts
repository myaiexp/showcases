// css-doodle example: The use attribute: code as an attribute value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The use attribute: code as an attribute value",
  summary:
    "A value that does not start with var( is read as the doodle code itself, which helps in frameworks whose template compilers choke on code as content. This doodle has no content at all.",
  section: "Attributes",
  tags: ['use', '@grid', '@p'],
  docs: [
    'pages/css-doodle-com/reference/attribute-use.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
