// ky example: baseUrl against prefix, the FAQ's table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'baseUrl or prefix?',
  summary:
    'Both options put a home address in front of short inputs, but they disagree about a leading slash. baseUrl follows the web\'s rules, so /users means the root of the site and the /api part is lost. prefix simply glues text, so /users and users both land inside /api. Red lines are calls that missed the real endpoint.',
  section: 'FAQ',
  tags: ['baseUrl', 'prefix', 'leading slash', 'FAQ'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
