// embedding-atlas example: density mode on two hundred thousand points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Density mode',
  summary:
    'config.mode: "density" shows the data as per-category density contours rather than dots, which reads better when hundreds of thousands of points overlap. Zooming in thins the density out until single points appear again.',
  section: 'Config',
  tags: ['config', 'mode', 'density'],
  docs: [
    'pages/apple-github-io/embedding-atlas/embedding-view.md',
    'repo/packages/component/src/lib/embedding_view/embedding_view_config.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
