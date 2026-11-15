// embedding-atlas example: passing a class directly as customTooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip as a bare class',
  summary:
    'CustomComponent also accepts the class on its own, without the { class, props } wrapper, when no extra props are needed. This one shows only the first word of the point\'s text in a pill, and leaves out the optional destroy().',
  section: 'Custom Tooltip',
  tags: ['customTooltip', 'CustomComponent', 'update'],
  docs: ['repo/packages/component/src/lib/embedding_view/types.ts', 'pages/apple-github-io/embedding-atlas/embedding-view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
