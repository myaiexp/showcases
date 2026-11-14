// One step instead of two: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One step instead of two',
  summary:
    'Plain fetch hands you a Response first and needs a second callback to get the data out. wretch reads the body for you: .get().json() ends with the object. Both columns fetch the same post and end with the same data, and a counter shows how many steps each needed.',
  section: 'Motivation',
  tags: ['fetch', 'json', 'get', 'callbacks'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
