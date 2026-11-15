// force-graph example: Render control: pauseAnimation and resumeAnimation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: pauseAnimation and resumeAnimation',
  summary:
    'pauseAnimation freezes the render loop and the pointer input; resumeAnimation restarts both. Moving link particles make the freeze easy to see, and the card toggles every two seconds.',
  section: 'Render control',
  tags: ['pauseAnimation', 'resumeAnimation', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
