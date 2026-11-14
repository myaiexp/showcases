// Zod example: Length rules, live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Length rules, live',
  summary:
    'Type a username and watch min, max, length or nonempty decide on every keystroke, with a live count. The message always says how many characters were expected.',
  section: 'Strings and formats',
  tags: ['.min', '.max', '.length', '.nonempty'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
