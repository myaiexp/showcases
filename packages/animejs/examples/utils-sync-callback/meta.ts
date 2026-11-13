// Utilities example: Utils sync() engine-loop callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utils sync() engine-loop callback',
  summary: 'A circle sweeps back and forth while a slider changes its speed through utils.sync(), which runs the assignment in step with the engine loop. A readout counts the sync callbacks and shows the current speed.',
  section: 'Utilities',
  tags: ['utils.sync', 'speed', 'Timer'],
  docs: [
    'pages/animejs-com/documentation/utilities/sync.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
