// motion example: Cancelling a page scope cancels its header scope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cancelling a page scope cancels its header scope',
  summary: 'A mini page where the page, header and sidebar each have their own scope, the last two created inside the first. Cancel the header and only it stops; cancel the page and everything inside goes with it. Each region shows its scope state.',
  section: 'Utils',
  tags: ['scopeMotion', 'nested scopes', 'scope.cancel', 'scope.state', 'root element'],
  docs: ['pages/motion-dev/docs/scope-motion.md', 'pages/motion-dev/docs/stagger.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
