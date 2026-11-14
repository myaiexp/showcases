// Sortable.js example: a plugin reacting when its option changes at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'React when a plugin option changes',
  summary:
    'A festival line-up with a plugin that labels the acts 1, 2, 3 or A, B, C. Switching the option while the page runs relabels instantly, because the plugin listens for changes and tidies what it is given.',
  section: 'Writing plugins',
  tags: ['optionListeners', 'option()', 'pluginName', 'initializeByDefault', 'drop'],
  docs: ['repo/plugins/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
