// Tippy.js example: two overlapping tips, with zIndex choosing which is in front
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which tip sits on top',
  summary:
    'When two tips overlap, the one with the higher stacking number is drawn in front. A help tip and an alert tip share a corner of this screen, and a switch trades their places.',
  section: 'Props: look',
  tags: ['zIndex', 'theme', 'trigger: manual', 'show()', 'setProps'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
