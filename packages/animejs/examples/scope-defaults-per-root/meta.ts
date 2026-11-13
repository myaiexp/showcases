// animejs example: Scope defaults shared per root
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scope defaults shared per root",
  summary: "Three scopes with different default ease values: the same animation code, declared without an ease, picks up each scope's default.",
  section: "Scope",
  tags: ['createScope', 'defaults', 'root', 'ease'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'pages/animejs-com/documentation/scope.md',
    'pages/animejs-com/documentation/scope/scope-parameters/defaults.md',
    'pages/animejs-com/documentation/scope/scope-parameters/root.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
