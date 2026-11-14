// Tippy.js example: onBeforeUpdate and onAfterUpdate log what setProps changed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Before and after a change',
  summary:
    'A tip stays open while its settings are flipped on the fly. Two hooks run around every change and log exactly which settings were handed over, so you can react to an update or check it.',
  section: 'Props: lifecycle hooks',
  tags: ['onBeforeUpdate', 'onAfterUpdate', 'setProps', 'showOnCreate'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
