// ky example: .json() on an empty body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When there is nothing to parse',
  summary:
    'Servers often answer a delete with an empty "done" (204 No Content). Asking Ky for .json() on that fails, because empty text is not valid JSON; an empty 200 fails the same way. Skip .json() when there is no data, or use the parseJson option to say what empty should mean.',
  section: 'Requests',
  tags: ['.json()', 'parseJson', '204', 'ky.delete'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
