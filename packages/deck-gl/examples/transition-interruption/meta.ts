// deck-gl example: transitionInterruption modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'transitionInterruption modes',
  summary:
    'Start a second camera move while one is running: BREAK stops where the camera is, SNAP_TO_END jumps to the first target, IGNORE drops the new request. The event log shows onTransitionStart, onTransitionInterrupt and onTransitionEnd.',
  section: 'Animations and transitions',
  tags: ['TRANSITION_EVENTS', 'transitionInterruption', 'onTransitionStart', 'onTransitionInterrupt', 'onTransitionEnd'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
