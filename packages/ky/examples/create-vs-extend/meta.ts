// ky example: create starts from scratch, extend inherits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'extend inherits, create starts over',
  summary:
    'Two ways to make a new client look alike but behave very differently. ky.extend() keeps everything the parent has and adds to it; ky.create() starts with nothing, so even the address start and the headers have to be written again. Pick which one fits: a variation of a client, or an independent one.',
  section: 'Instances',
  tags: ['ky.create', 'ky.extend', 'inheritance', 'prefix'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
