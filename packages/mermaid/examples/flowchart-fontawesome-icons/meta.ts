// mermaid example: FontAwesome icons in flowchart labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FontAwesome icons in flowchart labels',
  summary:
    'fa: and fab: prefixes in node text resolve to icons from locally registered FontAwesome 6 packs, loaded lazily and without a CDN.',
  section: 'Flowchart',
  tags: ['flowchart', 'fontawesome', 'icons', 'registerIconPacks'],
  docs: ['repo/packages/mermaid/src/docs/syntax/flowchart.md', 'repo/packages/mermaid/src/docs/config/icons.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
