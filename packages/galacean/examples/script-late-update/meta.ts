// galacean example: Script: onLateUpdate camera follow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Script: onLateUpdate camera follow",
  summary:
    "A ball moved in onUpdate and a camera that follows it from onLateUpdate, after every onUpdate has run, so it never lags a frame behind. A second script wraps an angle with a modulo in onLateUpdate as the docs do.",
  section: "Script",
  tags: ['Script', 'onUpdate', 'onLateUpdate'],
  docs: [
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
