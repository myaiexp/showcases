// Shape what each caller receives: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape what each caller receives',
  summary:
    'When calls are merged, only the first caller gets the real answer; the others get whatever the resolver builds from it. The default makes a clone so everyone can read the body. A custom resolver can label the copies, and a careless one that hands out the very same answer breaks the later readers.',
  section: 'Middlewares',
  tags: ['dedupe', 'resolver', 'middlewares'],
  docs: ['repo/src/middlewares/dedupe.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
