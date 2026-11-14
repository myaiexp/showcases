// Zod example: Zod Mini messages read "Invalid input" until a locale is loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mini speaks only after a locale is loaded',
  summary:
    'Regular Zod loads English by itself; Zod Mini does not, to keep bundles small, so every message in a sign-up check says "Invalid input". Loading a locale with z.config(en()) or z.config(fr()) brings real wording, and the verdicts never change.',
  section: 'Zod Mini',
  tags: ['zod/mini', 'z.config', 'zod/locales', 'en', 'fr', 'localeError'],
  docs: ['repo/packages/docs/content/packages/mini.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
