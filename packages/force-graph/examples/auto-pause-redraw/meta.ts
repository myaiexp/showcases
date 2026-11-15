// force-graph example: Render control: autoPauseRedraw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render control: autoPauseRedraw',
  summary:
    'Two identical graphs stop their layouts after two seconds. autoPauseRedraw(true) then stops repainting, so an overlay drawn in onRenderFramePost freezes; autoPauseRedraw(false) keeps repainting and the pulsing rings keep moving.',
  section: 'Render control',
  tags: ['autoPauseRedraw', 'onRenderFramePost', 'cooldownTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
