// 3d-force-graph example: Render control: pauseAnimation and resumeAnimation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: pauseAnimation and resumeAnimation",
  summary:
    "pauseAnimation() stops the whole render cycle, so the layout, the particles and the mouse controls freeze; resumeAnimation() starts it again. The renderer's own frame counter shows that nothing is drawn while paused.",
  section: "Render control",
  tags: ['pauseAnimation', 'resumeAnimation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
