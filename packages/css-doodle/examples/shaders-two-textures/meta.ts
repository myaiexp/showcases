// Several texture sections: texture0 and texture1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Several texture sections: texture0 and texture1",
  summary: "A shader can have any number of texture sections. texture0 holds a grid of dots and texture1 stripes, and the fragment mixes them with a mask that sweeps across with time.",
  section: "Shaders",
  tags: ["@shaders", "texture0", "texture1", "mix", "u_time"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
