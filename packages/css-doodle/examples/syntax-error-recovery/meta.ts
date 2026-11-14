// Error recovery: unknown function, unclosed (, a function that calls itself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Error recovery and warnings',
  summary:
    'Nothing in the language is fatal: incomplete code still draws, and the problems are reported on the diagnostics property and as warn events. An unknown function with arguments is emitted as its name, an unclosed parenthesis swallows the declarations after it (the border-radius here is lost), a function that calls itself expands to nothing, and a @keyframes without a name is reported.',
  section: 'Syntax overview',
  tags: ["diagnostics", "warn", "error recovery", "@use"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md", "pages/css-doodle-com/reference/js-api-diagnostics.md", "pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
