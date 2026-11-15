// zephyr3d example: AnimationController: states and dispatch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnimationController: states and dispatch',
  summary:
    'A controller binds to the figure\'s AnimationSet and holds idle, walk and run states, each a timeline with one looping play step and a transition time. dispatch() sends events that the current state\'s responses turn into state changes; the event log shows each result\'s policy.',
  section: 'Animation',
  tags: ['AnimationController', 'addState', 'setState', 'dispatch', 'responses', 'transition', 'statechange', 'timeline'],
  docs: ['repo/apps/doc/web/en/animation-controller.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
