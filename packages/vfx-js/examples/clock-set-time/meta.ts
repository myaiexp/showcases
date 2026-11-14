// VFX-JS example: deterministic frames with autoplay: false, setTime and render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pin the clock: setTime and render',
  summary:
    'With autoplay: false VFX-JS draws nothing on its own. vfx.setTime(t) pins the clock behind the time uniform and vfx.render() draws exactly one frame, so the same t always gives the same picture: a scrubber for the rainbow preset. The card steps through four times.',
  section: 'How it Works',
  tags: ['autoplay', 'setTime', 'render', 'time'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/vfx.ts', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
