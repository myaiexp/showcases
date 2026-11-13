// Utilities example: Utils keepTime() swap without restart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utils keepTime() swap without restart',
  summary: 'Pressing Switch target recreates a spinning animation on the next clock. The keepTime() lane continues from the same progress, while a plain revert-and-recreate lane restarts from zero; readouts show each progress.',
  section: 'Utilities',
  tags: ['utils.keepTime', 'animate', 'iterationProgress'],
  docs: [
    'pages/animejs-com/documentation/utilities/createtimekeeper.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
