// Tippy.js example: one switch turns every help tip in a form off and on
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turning help tips off',
  summary:
    'A sign-up form with little help icons and a "Show help tips" switch. Experienced users flip it off and every tip goes quiet; flipping it back on restores them, without rebuilding anything.',
  section: 'Methods',
  tags: ['disable()', 'enable()', 'hide()'],
  docs: ['repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
