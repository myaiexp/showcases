// Scope example: addOnce() versus add() across scope refreshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scope addOnce() survives refresh',
  summary: 'Two rows of circles built inside one scope. The addOnce() row keeps cycling colours through every scope.refresh(), while the add() row is reverted and restarts, and the readout counts how often each constructor ran.',
  section: 'Scope',
  tags: ['createScope', 'addOnce', 'add', 'refresh', 'mediaQueries'],
  docs: [
    'pages/animejs-com/documentation/scope/scope-methods/addonce.md',
    'pages/animejs-com/documentation/scope/scope-methods.md',
    'pages/animejs-com/documentation/scope/scope-methods/refresh.md',
    'pages/animejs-com/documentation/scope/scope-parameters/mediaqueries.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
