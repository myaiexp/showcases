// Tippy.js example: A shared tip with its own placement and look per button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shared tip, own placement',
  summary:
    'One tip box serves every button, yet the Delete button gets a red tip above and the others sit below in the default look. Each button\'s own settings win over the shared ones. In the full view you can switch that off.',
  section: 'Addons',
  tags: ['createSingleton', 'overrides', 'placement', 'theme'],
  docs: ['repo/website/src/pages/v6/addons.mdx', 'repo/website/src/pages/v6/themes.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
