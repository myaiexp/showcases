// Scope example: keepTime() versus add() when a scope rebuilds an animation with new parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scope keepTime() keeps playback position',
  summary: 'Two identical looping timelines whose travel range changes on every scope.refresh(). The add() row restarts from zero, while the keepTime() row is recreated with the new range and carries on from the same currentTime.',
  section: 'Scope',
  tags: ['createScope', 'keepTime', 'refresh', 'mediaQueries', 'createTimeline'],
  docs: [
    'pages/animejs-com/documentation/scope/scope-methods/keeptime.md',
    'pages/animejs-com/documentation/scope/scope-parameters.md',
    'pages/animejs-com/documentation/scope/scope-methods/refresh.md',
    'pages/animejs-com/documentation/timeline/timeline-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
