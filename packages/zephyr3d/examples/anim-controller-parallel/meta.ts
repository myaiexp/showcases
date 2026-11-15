// zephyr3d example: AnimationController: sequence, parallel and emit steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnimationController: sequence, parallel and emit steps',
  summary:
    'An intro state runs a spin and a delayed wave as parallel branches, waits for both, then emits an event; a statecomplete listener moves the controller to idle. The spin is a clip made in code with a NodeEulerRotationTrack.',
  section: 'Animation',
  tags: ['parallel', 'sequence', 'wait', 'emit', 'statecomplete', 'createAnimation', 'NodeEulerRotationTrack', 'setState force'],
  docs: ['repo/apps/doc/web/en/animation-controller.md', 'repo/apps/doc/web/en/animation-keyframe.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
