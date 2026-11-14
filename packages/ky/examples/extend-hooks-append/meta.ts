// ky example: extend appends hooks, replaceOption replaces them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hooks add up when you extend',
  summary:
    'A client extended with a hook keeps the parent\'s hooks and adds its own, so a request passes through both. When the child must run only its own, wrap the hooks in replaceOption; to run none, set them to undefined. Step through the three ways and watch which headers the server receives.',
  section: 'Instances',
  tags: ['ky.extend', 'hooks', 'replaceOption', 'beforeRequest'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
