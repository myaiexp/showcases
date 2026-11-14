// Papa Parse example: Papa.BAD_DELIMITERS, delimiters Papa refuses to use
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Delimiters Papa refuses',
  summary:
    'Papa.BAD_DELIMITERS lists characters that can never separate cells: the two line-break characters, the quote mark and the byte order mark. Ask for one and Papa quietly uses a comma instead, in parse and in unparse.',
  section: 'Extras',
  tags: ['Papa.BAD_DELIMITERS', 'delimiter', 'Papa.BYTE_ORDER_MARK', 'Papa.unparse'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
