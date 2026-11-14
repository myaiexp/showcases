// Tippy.js example: hover to preview, click to keep the preview open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Preview on hover, pin on click',
  summary:
    'A reading list of links. Hovering one previews the article in a small tip that leaves with the cursor. Clicking pins the preview open so you can read it, until you click the link again or somewhere else.',
  section: 'Props: behaviour',
  tags: ['trigger: mouseenter click', 'hideOnClick', 'onHidden'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
