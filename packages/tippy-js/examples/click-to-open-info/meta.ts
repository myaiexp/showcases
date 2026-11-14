// Tippy.js example: info icons that open their tip on click, not hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click for details',
  summary:
    'A pricing plan with a small info icon beside each feature. A click opens the explanation, and stays open while you read it: handy for longer notes and for touch screens, where hovering is unreliable.',
  section: 'Props: behaviour',
  tags: ['trigger: click', 'hideOnClick', 'data-tippy-content'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
