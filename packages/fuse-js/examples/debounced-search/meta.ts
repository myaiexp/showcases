// Fuse.js example: searching on every keystroke vs waiting for a pause in typing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search when the typing pauses',
  summary:
    'The same typing feeds two searches. One runs Fuse on every keystroke; the other waits until typing pauses for 200 ms, as the React guide suggests, and runs far fewer searches for the same final result. Each tick on the timeline is one keystroke or one search.',
  section: 'Articles',
  tags: ['search', 'debounce', 'search-as-you-type', 'threshold'],
  docs: ['repo/docs/articles/using-fuse-with-react.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
