// Zod example: partial with a key list makes only those fields optional
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partial for only some fields",
  summary:
    "A contact needs a name and email, but phone and company can come later. .partial({ phone: true, company: true }) relaxes just those two; the others stay required, unlike .partial() with no argument.",
  section: 'Objects',
  tags: ['.partial', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
