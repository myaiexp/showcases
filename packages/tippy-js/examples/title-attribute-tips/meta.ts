// Tippy.js example: turning plain title attributes into Tippy tips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Upgrading plain title tooltips',
  summary:
    'Buttons that already carry a title="..." get a Tippy tip made from it, so you do not rewrite the page. The title is removed once Tippy has read it, otherwise the browser would show its own plain tooltip on top.',
  section: 'FAQ',
  tags: ['content', 'title attribute', 'plugins', 'titleAttribute', 'onCreate', 'setContent()'],
  docs: ['repo/website/src/pages/v6/faq.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
