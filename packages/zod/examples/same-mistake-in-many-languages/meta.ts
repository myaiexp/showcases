// Zod example: One mistake in many languages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One mistake in many languages',
  summary:
    'Zod ships messages in dozens of languages as locales. The same failed check, too short, wrong type or not an email, is worded by a dozen of them in turn, each set only for the instant of its parse.',
  section: 'Customizing errors',
  tags: ['z.locales', 'z.config', 'locale', 'internationalization'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
