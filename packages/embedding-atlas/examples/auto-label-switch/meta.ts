// embedding-atlas example: turning automatic labels on and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic labels on and off',
  summary:
    'Automatic labels switch on by themselves once queryClusterLabels is set and labels is not. config.autoLabelEnabled: false turns them off without removing the callback; true brings them back.',
  section: 'Config',
  tags: ['config', 'autoLabelEnabled', 'queryClusterLabels'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
