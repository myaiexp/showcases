// animejs example: Scope mediaQueries and matches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scope mediaQueries and matches",
  summary: "A scope with named media queries: the constructor re-runs when a query flips and reads self.matches to pick the axis, scale and speed.",
  section: "Scope",
  tags: ['createScope', 'mediaQueries', 'matches', 'root'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'pages/animejs-com/documentation/scope.md',
    'pages/animejs-com/documentation/scope/scope-parameters/mediaqueries.md',
    'pages/animejs-com/documentation/scope/add-constructor-function.md',
    'pages/animejs-com/documentation/scope/scope-parameters/root.md',
    'pages/animejs-com/documentation/scope/scope-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
