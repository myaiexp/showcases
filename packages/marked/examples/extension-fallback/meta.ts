// marked example: Extension fallback with false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Extension fallback with false",
  summary:
    "Two extensions share one name: the later one draws URGENT marks in red and returns false for the rest, so the earlier extension's yellow mark takes over. Returning nothing instead leaves those marks blank.",
  section: 'Custom extensions',
  tags: ['extensions','false','fallback','renderer'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Instance.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
