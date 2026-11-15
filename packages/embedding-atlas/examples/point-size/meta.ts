// embedding-atlas example: overriding the automatic point size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point size',
  summary:
    'The view picks a point size from how dense the data is on screen. config.pointSize overrides it with a fixed size; null hands the choice back.',
  section: 'Config',
  tags: ['config', 'pointSize'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
