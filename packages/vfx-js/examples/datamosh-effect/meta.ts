// VFX-JS example: DatamoshEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DatamoshEffect',
  summary:
    'A fake datamosh on a moving video. DatamoshEffect passes the frames through until enable() is called, then keeps a motion-compensated copy of the last frame so new movement drags old pixels around. disable() lets it heal. Cards switch it on and off on a timer; the full view toggles on click.',
  section: '@vfx-js/effects',
  tags: ['DatamoshEffect', 'enable', 'disable', 'blockSize', 'dup', 'healRate', 'video', 'liveVideo'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/datamosh.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
