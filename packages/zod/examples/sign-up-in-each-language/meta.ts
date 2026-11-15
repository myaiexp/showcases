// Zod example: A whole sign-up in each language
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A whole sign-up in each language',
  summary:
    'One bad sign-up checked under one locale at a time. Every issue keeps its place and kind; only the language of the message changes, from German to French, Japanese, Spanish, Russian and Polish.',
  section: 'Customizing errors',
  tags: ['z.locales', 'z.config', 'locale', 'safeParse'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
