// tanstack-charts example: Line morph and rolling fallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line morph and rolling fallback',
  summary:
    'path: morph interpolates a line path command by command when its values change in place. Rolling is configured only through the rolling object, and fallback chooses what an update that breaks the rolling rules does: snap installs the new path at once, morph interpolates it. The series is replaced here, which a rolling update cannot express.',
  section: 'Motion',
  tags: ['path', 'morph', 'rolling', 'fallback'],
  docs: ['repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
