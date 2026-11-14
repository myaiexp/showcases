// ky example: extend with a function refers to the parent's defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build on what the parent has',
  summary:
    'When a smaller client should add to its parent\'s settings rather than replace them, give ky.extend() a function. It receives the parent\'s options, so a users client can take the shop\'s prefix and add /users to it without repeating the address. Change the section name to see the address follow.',
  section: 'Instances',
  tags: ['ky.extend', 'function', 'prefix', 'options'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
