// Zod example: A brand leaves the value untouched
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A brand leaves the value untouched',
  summary:
    'A UserId and an OrderId are both text that is branded differently. At run time a branded id comes out as the same plain text it went in as, with nothing attached. The brand only exists for TypeScript, which refuses to pass a UserId where an OrderId is wanted.',
  section: 'Defaults, catch and more',
  tags: ['brand'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
