// AntV Infographic example: Resources: ref:remote with a same-page blob: URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resources: ref:remote with a same-page blob: URL',
  summary:
    'The remote protocol is ref:remote[:fmt]:<url>. A real server URL would be a network request, so each SVG here is made into a blob: URL on the page and the protocol fetches that instead. The blob URLs are revoked when the example is closed.',
  section: 'Resources',
  tags: ['icon', 'ref:remote', 'blob:', 'format hint', 'list-row-horizontal-icon-arrow'],
  docs: [
    'repo/site/src/content/learn/resources.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
