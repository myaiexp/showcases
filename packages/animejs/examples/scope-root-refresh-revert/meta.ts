// animejs example: Scope root with refresh, revert and registered methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scope root with refresh, revert and registered methods",
  summary: "Two scopes, each limited to its own row with root. Buttons call refresh(), revert() and a method registered with add(name, fn).",
  section: "Scope",
  tags: ['createScope', 'root', 'refresh', 'revert', 'add', 'methods'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'pages/animejs-com/documentation/scope.md',
    'pages/animejs-com/documentation/scope/scope-parameters/root.md',
    'pages/animejs-com/documentation/scope/scope-methods/refresh.md',
    'pages/animejs-com/documentation/scope/scope-methods/revert.md',
    'pages/animejs-com/documentation/scope/scope-methods/add.md',
    'pages/animejs-com/documentation/scope/register-method-function.md',
    'pages/animejs-com/documentation/scope/add-constructor-function.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
