// Tippy.js example: hover anywhere on a row, the tip sits on its small icon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover the row, tip on the icon',
  summary:
    'In a list of notifications, a small warning icon is hard to hit. Here you can hover anywhere on the row and the explanation still opens right on the icon, because the row listens while the icon is what the tip points at.',
  section: 'Misc',
  tags: ['triggerTarget', 'placement', 'tippy()'],
  docs: ['repo/website/src/pages/v6/misc.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
