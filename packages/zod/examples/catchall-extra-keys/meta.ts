// Zod example: a catchall schema validates every key the object does not name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Catchall: extra keys with a rule",
  summary:
    "A product record has one fixed field (sku) and then any number of warehouse names with a stock count. .catchall(z.number()) lets unknown keys through, but only when their values are numbers; a bad one is reported under its own key.",
  section: 'Objects',
  tags: ['.catchall', 'z.object', 'z.number'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
