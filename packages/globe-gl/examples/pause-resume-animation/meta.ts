// globe-gl example: Render: pauseAnimation and resumeAnimation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: pauseAnimation and resumeAnimation",
  summary:
    "pauseAnimation() stops globe.gl's render loop: the spinning globe and its ripple rings freeze on the last frame and the controls stop responding. resumeAnimation() starts it again from where it left off.",
  section: "Render Control",
  tags: ["pauseAnimation", "resumeAnimation", "ringsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
