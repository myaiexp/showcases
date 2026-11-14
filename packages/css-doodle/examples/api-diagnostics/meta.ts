// The diagnostics property: warnings of the last render, with where they are
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The diagnostics property',
  summary:
    'Nothing in the language is a fatal error, so problems show up on doodle.diagnostics: an array of { message } objects from the last render, where a warning from the code also carries index (a character offset) or pos ([column, line]). After every render the example lists them as line:column and message, for an unknown function, an unclosed parenthesis and a nameless @keyframes.',
  section: 'Element API',
  tags: ['diagnostics', 'warn', 'error recovery'],
  docs: ['pages/css-doodle-com/reference/js-api-diagnostics.md', 'pages/css-doodle-com/reference/event-warn.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
