// Papa Parse example: transform cleans each value as it is read
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clean every value as it is read',
  summary:
    'transform is called for each value with the value and its column name. Trim stray spaces, upper-case the product codes, strip the euro sign: what the function returns is what ends up in your data.',
  section: 'Parse config',
  tags: ['transform', 'header'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
