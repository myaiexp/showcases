// Sigma.js example: flat label backgrounds with colour and padding
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Label backgrounds',
  summary:
    'labelBackgroundColor and labelBackgroundPadding draw a flat rectangle behind each label, so text stays readable where edges cross it.',
  section: 'Styling labels',
  tags: ['labels', 'labelBackgroundColor', 'labelBackgroundPadding', 'readability'],
  docs: [`${DOCS}/how-to/labels/styles-positioning.mdx`, `${DOCS}/reference/style-properties.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
