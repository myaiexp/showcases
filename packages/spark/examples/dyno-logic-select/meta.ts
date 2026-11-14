// Spark example: greaterThan, select and step splitting splats by a moving plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Branching with select and step',
  summary:
    'A knot cut by a moving plane into two looks: splats on the near side keep their colour, those beyond it turn dim grey and shrink. The split is made either with dyno.greaterThan feeding dyno.select, or with dyno.step feeding dyno.mix. The plane is a normal and an offset in uniforms, drawn as a translucent mesh.',
  section: 'Dyno Standard Library',
  tags: ['select', 'greaterThan', 'step', 'mix', 'dot', 'dynoVec3', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/dyno-overview.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
