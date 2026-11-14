// ky example: the prefix option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'prefix: put a path in front',
  summary:
    'When every call to your API starts the same way, prefix saves repeating it: Ky puts it in front of whatever you pass and tidies the slashes at the join. Unlike baseUrl, a leading slash on the input makes no difference, so /users and users both land inside the prefix.',
  section: 'URLs',
  tags: ['prefix', 'slashes', 'ky.extend'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
