// embedding-atlas example: a custom tooltip class with extra props
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom tooltip',
  summary:
    'customTooltip takes { class, props }. The class is built with the tooltip\'s element and props (the hovered DataPoint as tooltip, plus the extra props: topic names and an accent colour), updated as the point changes and destroyed when it closes.',
  section: 'Custom Tooltip',
  tags: ['customTooltip', 'CustomComponent', 'class', 'props', 'querySelection'],
  docs: [
    'repo/packages/docs/embedding-view.md',
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
