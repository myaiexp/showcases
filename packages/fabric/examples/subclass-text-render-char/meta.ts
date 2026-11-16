// fabric example: Subclassing: Textbox with its own _renderChar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassing: Textbox with its own _renderChar',
  summary:
    'Redacted extends Textbox and overrides _renderChar, the per-character draw call the bitmap-text guide replaces. With censored on it draws a block for each letter and calls super for everything else.',
  section: 'Subclassing',
  tags: ['Textbox', '_renderChar', 'cacheProperties', 'customProperties'],
  docs: [
    'repo/src/content/docs/docs/Old docs/subclassing-example.mdx',
    'repo/src/content/docs/docs/Old docs/subclassing-example.js',
    'repo/src/content/docs/api/classes/Textbox.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
