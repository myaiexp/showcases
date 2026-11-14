// A catcher can supply a stand-in answer example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A catcher can supply a stand-in answer',
  summary:
    'If a catcher returns a value instead of throwing, that value becomes the result of the whole request. The page asks for a post that does not exist and still shows something: the placeholder the 404 catcher handed back.',
  section: 'Catchers',
  tags: ['notFound', 'json', 'catcher'],
  docs: ['repo/src/resolver.ts', 'repo/src/types.ts', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
