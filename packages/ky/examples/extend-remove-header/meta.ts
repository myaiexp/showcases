// ky example: extend with undefined removes inherited headers and hooks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Take away what a client inherited',
  summary:
    'A client built with ky.extend() inherits everything from its parent, including things you do not want to repeat, such as a debug header. Passing a header as undefined removes it, and hooks set to undefined clear the inherited ones. The live client below is built from the testing one and drops both.',
  section: 'Instances',
  tags: ['ky.extend', 'undefined', 'headers', 'hooks'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
