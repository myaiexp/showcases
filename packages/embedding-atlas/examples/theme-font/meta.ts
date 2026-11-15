// embedding-atlas example: changing the view's font through theme.fontFamily
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Font family',
  summary:
    'theme.fontFamily sets the CSS font stack for the view\'s text: labels, tooltips and the status bar. Four stacks are cycled over the same labelled clusters.',
  section: 'Theme',
  tags: ['theme', 'fontFamily', 'labels'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/theme.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
