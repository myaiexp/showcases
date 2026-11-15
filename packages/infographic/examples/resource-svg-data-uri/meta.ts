// AntV Infographic example: Resources: an SVG as a data URI icon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resources: an SVG as a data URI icon',
  summary:
    'The built-in SVG protocol: an icon value that starts with data:image/svg+xml, followed by the SVG text is drawn as is, with no resource loader registered. Each step gives the three items a different set of hand-written SVG icons.',
  section: 'Resources',
  tags: ['icon', 'data:image/svg+xml', 'inline', 'ResourceConfig', 'list-row-horizontal-icon-arrow'],
  docs: [
    'repo/site/src/content/learn/resources.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
